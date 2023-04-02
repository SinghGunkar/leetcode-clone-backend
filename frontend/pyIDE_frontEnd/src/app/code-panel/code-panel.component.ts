import { environment } from './../environment';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild, Input } from '@angular/core';
import { Terminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';
import * as ace from "ace-builds";
import { CallbackOneParam } from "./../interfaces";
import { AuthService } from '../auth.service';
import { AbstractControl, FormControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-code-panel',
  templateUrl: './code-panel.component.html',
  styleUrls: ['./code-panel.component.css']
})

export class CodePanelComponent {
  //  ENDPOINT is the backend url such as 'http://127.0.0.1:8081/';

  @Input() questionID = ''; // decorate the property with @Input()

  private ENDPOINT = environment.backendEndpoint;

  public aceEditor: any
  public term!: Terminal;
  public fitAddon!: FitAddon;

  public show_progress = false;
  public show_upload = false;

  private file: any = null;
  private loading: boolean = false;
  private reader = new FileReader();

  private xtermKeyInputState: boolean;

  private stdin_current_line:string;

  private saved_code: string;

  stdInputForm!: FormGroup;


  @ViewChild("editor")
  private editor!: ElementRef<HTMLElement>;

  @ViewChild('xtermTerminal') terminalDiv!: ElementRef;

  constructor(private http: HttpClient,private auth: AuthService,private fb: FormBuilder) {
    this.term = new Terminal({ convertEol: true });
    this.fitAddon = new FitAddon();
    this.show_progress = false;      //the state of the progress bar when running the py file
    this.show_upload = false;        //the state of display the upload box
    this.xtermKeyInputState = false; //set xterm sefault not allow input
    this.stdin_current_line = '';
    this.saved_code = '';

    this.stdInputForm = this.fb.group({
      stdInput: new FormControl(''),
    })
  }

  ngAfterViewInit(): void {
    //initialization aceEditor's settings
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict'); //this may change later
    this.aceEditor = ace.edit(this.editor.nativeElement);

    console.log('qid===========',this.questionID)










    this.aceEditor.session.setValue(`print("Hello world!")`);   //default value to print "Hello world!"
    this.aceEditor.setTheme("ace/theme/twilight");              //set theme to twilight
    this.aceEditor.getSession().setMode("ace/mode/python");     //set mode to python

    //initialization xterm's settings
    this.term.loadAddon(this.fitAddon);                         //load the addon that allow to fit the terminal to the container (such as div box)
    this.term.open(this.terminalDiv.nativeElement);             //open the terminal
    this.term.writeln('Click run to see result:');              //set the default text

    this.fitAddon.fit();                                        //fit the terminal to the container

    this.getSavedData()
  }

  onSubmit(): void {
    this.term.clear();      //clear the terminal
    this.term.reset();      //reset the terminal

    console.log(this.stdInputForm.value.stdInput)

    this.show_progress = true;
    let code = null;
    code = this.aceEditor.session.getValue();
    console.log(code);

    let code_data = { 'code': code, 'stdin' : this.stdin_current_line };
    let post_data = JSON.stringify(code_data);

    console.log('post_data:', post_data)

    const headers = this.auth.authTokenHeader();

    let uid = this.auth.getUID();

    this.http.post<any>(this.ENDPOINT + 'submission/submitCode/' + `${uid!.toString()}` + '/' + `${this.questionID.toString()}`,
    { "code": `${code.toString()}`,"input":this.stdInputForm.value.stdInput },{headers}
  ).subscribe(
    (response)=>{
      console.log(response);
    },(error)=>{
      console.log(error)
    }
  )


    this.http.post<any>(this.ENDPOINT + 'submission/runCode',
      { "code": `${code.toString()}`,"input":this.stdInputForm.value.stdInput },{headers}
    ).subscribe((data: any) => {
      // this.term.clear();      //clear the terminal
      // this.term.reset();      //reset the terminal

      console.log(data)

      console.log(this.formatString(data.result));
      this.term.write(`${this.formatString(data.result)}`);

      //uncomment this to allow xterm accept input
      //===================================
      this.xtermInoutOn();
      //===================================

      this.show_progress = false;
      return
    },(error)=>{

      console.log("resive error",error)

      console.log("resive error",error.error.error)
      this.term.write(error.error.error.toString());

      this.show_progress = false;
      return

      
    })
  }

  

  //change the xtermjs top allow it allow input
  xtermInoutOn() {
    if (this.xtermKeyInputState == false) {
      this.xtermKeyInputState = true;


      this.term.onKey(e => {
        console.log('key press:', e.key);
        console.log('event:', e);


        // this.term.write(e.key);
        let keyPress = e.key;
        console.log('p:', parseInt(keyPress))
        if (keyPress == '\r') {           //enter
          this.term.write('\n');
          let stdin_temp = this.stdin_current_line;
          console.log(stdin_temp);
          this.stdin_current_line = '';

          //do something with the stdin_temp
          //currentlly used for stdin

          // this.term.write('\n');
          // this.term.write('current stdin value are\n');
          // this.term.write(stdin_temp);
          // this.term.write('\nclick run to see result\n');

          /////////

        } else if (keyPress === "\x7F") { //backspace
          this.term.write('\b \b');
          this.stdin_current_line = this.stdin_current_line.slice(0,this.stdin_current_line.length - 1);
          console.log(this.stdin_current_line);

        } else if (this.validKey(e)) {
          this.term.write(e.key);
          this.stdin_current_line += (e.key).toString();
          console.log(this.stdin_current_line)
        }
      })
    }

  }

  //replace all the '\n' to '\r\n' other wise the xterm cannot display it
  formatString(str: string) {
    let new_str = str.toString();
    const regex = /\n/g;
    new_str = new_str.replaceAll(regex, "\r\n");
    return new_str;
  }

  //when user select a file this will read into this.file
  onChange(event: any) {
    this.file = event.target.files[0];
    this.reader.readAsText(this.file, "UTF-8");
  }

  //when user submit the file this will read into editor
  onUpload() {
    this.loading = !this.loading;
    console.log(this.reader.result);
    this.aceEditor.session.setValue(this.reader.result);
    // this.setUploadBox(false)
    this.show_upload = false;
  }

  //hide or displat the file uploader box
  controldplayUploadBox() {
    this.show_upload = !this.show_upload;
  }

  clearXtermAndBuffer(){
      this.term.clear();      //clear the terminal
      this.term.reset();      //reset the terminal
      this.stdin_current_line = ''; //clear the stdin buffer
  }

  //check if the key is printable
  ///////////////have problem!!!!!
  validKey(e: any) {
    var keycode = (e.key).charCodeAt(0);
    console.log('code:', keycode)

    var valid =
      (keycode > 47 && keycode < 58) || // number keys
      keycode == 32 || keycode == 13 || // spacebar & return key(s) (if you want to allow carriage returns)
      (keycode > 64 && keycode < 91) || // letter keys
      (keycode > 95 && keycode < 112) || // numpad keys
      (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
      (keycode > 218 && keycode < 223);   // [\]' (in order)

    return valid;
  }


  private getSavedData(){
    const headers = this.auth.authTokenHeader();
    let uid = this.auth.getUID();
    console.log("uid:", uid)

    console.log('qid===++========',this.questionID)
    console.log(this.ENDPOINT + 'submission/getOneSubmission/' + `${uid!.toString()}` + '/' + `${this.questionID.toString()}`)

    this.http.get<any>(this.ENDPOINT + 'submission/getOneSubmission/' + `${uid!.toString()}` + '/' + `${this.questionID.toString()}`,
      {headers}
    ).subscribe((data)=>{
      let received_data = data;
      console.log("Find saved data!:",data);
      console.log("Find saved code!:",data.result.userSubmittedCode);
      this.aceEditor.session.setValue(data.result.userSubmittedCode);

      console.log("Find saved code!:",data.result.codeResults);
      // codeResults
      this.term.clear();      //clear the terminal
      this.term.reset();      //reset the terminal

      this.term.writeln(data.result.codeResults); 

    },(error)=>{

      console.log('error',error);
      this.term.writeln(`No save code find, click run will auto save your code.`); 
      this.aceEditor.session.setValue(`print("Hello world!")`);   //default value to print "Hello world!"
    })
  }

  refresh(){
    window.location.reload();
  }

}
