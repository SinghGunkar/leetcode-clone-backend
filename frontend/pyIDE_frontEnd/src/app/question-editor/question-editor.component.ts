import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as ace from "ace-builds";
import { CallbackOneParam } from "./../interfaces";
import { HttpClient } from '@angular/common/http';
import { environment } from './../environment';
import { AbstractControl, FormControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { QuestionServiceService } from './../question-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.css']
})
export class QuestionEditorComponent {


  @ViewChild('editor') editor: any;

  // @ViewChild("codeEditor")
  // private codeEditor!: ElementRef<HTMLElement>;

  @ViewChild("codeEditor")
  private codeEditor!: ElementRef<HTMLElement>;

  newQuestionForm!: FormGroup;

  public aceEditor: any


  questionTitle = '';
  questionText = '';
  questionCode = '';

  constructor(private http: HttpClient, private fb: FormBuilder, private auth:AuthService, private questionService: QuestionServiceService,private router: Router) {
    this.auth.adminOnly();
    this.newQuestionForm = this.fb.group({
      course_name: new FormControl('', [Validators.required]),
    })
  }

  ngAfterViewInit(): void {
    //initialization aceEditor's settings
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict'); //this may change later
    this.aceEditor = ace.edit(this.codeEditor.nativeElement);

    this.aceEditor.session.setValue(`print("Hello world!")`);   //default value to print "Hello world!"
    this.aceEditor.setTheme("ace/theme/twilight");              //set theme to twilight
    this.aceEditor.getSession().setMode("ace/mode/python");     //set mode to python
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


  logChange(event: any) {
    // console.log(this.editor);
    console.log(event);
    console.log(event.html);
    this.questionText = event.html;
    // console.log(this.editor.html)
  }

  submitQuestion() {
    console.log(this.newQuestionForm.value.course_name)
    console.log(this.questionText)
    console.log(this.aceEditor.getSession().getValue())

    let title = this.newQuestionForm.value.course_name
    let description = this.questionText;
    let code = this.aceEditor.getSession().getValue();

    this.questionService.submitNewQuestion({"code": code, "description": description, "title": title },(response)=>{
      console.log(response)
      this.router.navigate(['/dashboard']);
    })

    


  }

  cancel(){
    this.router.navigate(['/dashboard']);
  }

}
