import { environment } from './../environment';

import { HttpClient } from '@angular/common/http';


import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Terminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';
import * as ace from "ace-builds";



export interface CallbackOneParam<T1, T2 = void> {
  (param1: T1): T2;
}



@Component({
  selector: 'app-code-panel',
  templateUrl: './code-panel.component.html',
  styleUrls: ['./code-panel.component.css']
})
export class CodePanelComponent {
  aceEditor: any
  // private ENDPOINT = 'http://127.0.0.1:8081/';
  private ENDPOINT= environment.backendEndpoint;
  public term!: Terminal;
  public fitAddon!: FitAddon;

  public show_progress = false;

  


  @ViewChild("editor")
  private editor!: ElementRef<HTMLElement>;
  
  @ViewChild('xtermTerminal') terminalDiv!: ElementRef;


  constructor(private http: HttpClient){

    this.term = new Terminal();
    this.fitAddon = new FitAddon();
    this.show_progress = false;


  }

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setValue(`print("Hello world!")`);
    this.aceEditor.setTheme("ace/theme/twilight");
    this.aceEditor.getSession().setMode("ace/mode/python");




    this.term.loadAddon(this.fitAddon);
    this.term.open(this.terminalDiv.nativeElement);
    this.term.writeln('Click run to see result:');

    this.fitAddon.fit();
  }

  onSubmit(): void {
    this.show_progress = true;
    let code = null;
    code = this.aceEditor.session.getValue();
    console.log(code);

    let code_data = { 'code': code };

    let post_data = JSON.stringify(code_data);

    console.log('post_data:', post_data)
    this.http.post(this.ENDPOINT + 'postCode',
      { "code": `${code.toString()}` }
    ).subscribe((data: any) => {
      console.log(data)
      // callback('')

      // document.getElementById("result")!.innerHTML = `${data.returnValue}`;
      this.term.clear();
      console.log(this.formatString(data.returnValue))//
      this.term.write(`${this.formatString(data.returnValue)}`)
      // this.term.onKey(e => {
      //   console.log(e.key);
      //   this.term.write(e.key);
      //   if (e.key == '\r')
      //     this.term.write('\n');
      // })
      this.show_progress = false;
      return
    })
    // this.http.get<Object[]>(this.ENDPOINT)
    // .subscribe((data: any) => {
    //   console.log(data)

    // })
    

  }



  formatString(str: string) {
    let new_str = str.toString()
    const regex = /'/ig;
    const regexHTMLTag = /\n/g;


    //cleanText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");

    new_str = new_str.replaceAll(regexHTMLTag, "\r\n");


    return new_str;
  }


  





}
