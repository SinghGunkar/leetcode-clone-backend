import { QuestionServiceService } from './../question-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})

/**
 * this component is used to display and all questions at the dashboard
 */
export class ListQuestionsComponent {
  
  questionList: any[];

  constructor (private questionService: QuestionServiceService,private router: Router, private fb: FormBuilder){
    this.questionList = [];
  }

  ngOnInit(): void {
    this.questionService.getQuestionsList((questionsList)=>{
      this.questionList = questionsList;
      console.log(questionsList)
    })
  }

  displayedColumns: string[] = [ 'title', 'id'];
}
