import { AfterViewInit, Component, ElementRef, ViewChild, Input, ChangeDetectorRef, HostListener } from '@angular/core';
import * as ace from "ace-builds";
import { HttpClient } from '@angular/common/http';
import { environment } from './../environment';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { QuestionServiceService } from './../question-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.css']
})
export class QuestionEditorComponent implements AfterViewInit{


  @ViewChild('editor') editor: any;

  @ViewChild("codeEditor")
  private codeEditor!: ElementRef<HTMLElement>;

  questionForm!: FormGroup;

  public aceEditor: any

  @Input() questionTitle = '';
  @Input() questionText = '';
  @Input() questionCode = '';
  @Input() qid: string | undefined; // check if the requested question is new

  newChange: boolean = false;
  lastModified: string = '';

  constructor(private http: HttpClient, private fb: FormBuilder, 
              private auth:AuthService, private questionService: QuestionServiceService,
              private router: Router,  private cdRef: ChangeDetectorRef   ) {
    this.auth.adminOnly();
    this.questionForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      editor: new FormControl('')
    });
  }

  ngAfterViewInit(): void {
    //initialization aceEditor's settings
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict'); //this may change later
    this.aceEditor = ace.edit(this.codeEditor.nativeElement);

    this.aceEditor.session.setValue(this.questionCode);         // default value to the current code question
    this.aceEditor.setTheme("ace/theme/twilight");              //set theme to twilight
    this.aceEditor.getSession().setMode("ace/mode/python");     //set mode to python

    this.questionForm.controls["title"].setValue(this.questionTitle);
    this.questionForm.controls["editor"].setValue(this.questionText); 
    this.cdRef.detectChanges(); 
  }

  modules = {
    formula: false,
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // ['image'],
      ['code-block']
    ],
  };


  /**
   * Keep track of changes made in the editor
   * @param event 
   */
  logChange(event: any) {
    this.newChange = true;
    this.questionText = event.html;
  } // end of logChange()

  saveQuestion() {
    let title = this.questionForm.value.title
    let description = this.questionForm.value.editor.length < 1 ? "No description posted yet!" : this.questionForm.value.editor;
    let code = this.aceEditor.getSession().getValue(); // To be implemented in the backend

    if (this.qid === undefined) { // new question
      this.questionService.submitNewQuestion({"code": code, "description": description, "title": title },(response)=>{
        this.router.navigate(['/dashboard']);
      });
    } else { // updating an existing question
      this.lastModified = "Saving...";
      this.questionService.updateQuestion({"qid": this.qid, "code": code, "description": description, "title": title },(response)=>{
        this.newChange = false;
        // show the time of the modification
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date()
        let day: string = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        let time: string = `${(date.getHours() + 1) % 13}:${date.getMinutes()} ${date.getHours() + 1 < 12 ? "AM" : "PM"}`;
        this.lastModified = `Saved on:\t ${day} (${time})`;
        });   
    }
  } // end of saveQuestion()

  /**
   * When button is clicked, warn the users if there is data that has not be explicitly saved yet.
   * Return the user back to the dashboard
   */
  cancel(){
    if (this.newChange) {
      if (window.confirm("This question will not be saved! Are you sure you want to leave this page?")) {
        this.router.navigate(['/dashboard']);
      } 
    } else if (!this.questionForm.valid) {
      this.router.navigate(['/dashboard']);
    } else if (this.qid !== undefined && !this.newChange) {
      this.router.navigate(['/dashboard']);
    }
  } // end of cancel()


  
  /**
   * If the window is being reloaded or closed, show a warning that unsaved changes
   * will be deleted
   */
  @HostListener('window:beforeunload', ['$event'])
  onExit($event: any) {
    if (this.newChange) {
      return window.confirm("There are unsaved changes! Are you sure you want to exit?");
    }
    return true;
  } // end of onExit()

}
