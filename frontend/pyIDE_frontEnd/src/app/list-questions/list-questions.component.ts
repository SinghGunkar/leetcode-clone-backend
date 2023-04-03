import { QuestionServiceService } from './../question-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})

/**
 * this component is used to display and all questions at the dashboard
 */
export class ListQuestionsComponent {
  email:string;
  role:string;
  name:string;
  id:string;
  isAdmin:boolean;

  
  questionList: any[];

  constructor (private questionService: QuestionServiceService,private router: Router, private fb: FormBuilder,private auth:AuthService){
    this.questionList = [];

    this.email = this.auth.getEmail();
    this.role = this.auth.getUserType();
    this.name = this.auth.getUserName();
    this.id = this.auth.getUID();

    if(this.role == "admin"){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }

  ngOnInit(): void {
    this.questionService.getQuestionsList((questionsList)=>{
      this.questionList = questionsList;
      // console.log(questionsList)
    })
  }

  deleteQuestion(QID:string){
    if (window.confirm("Are you sure you want to delete this question?")) {
      this.questionService.deleteQuestion(QID,(response)=>{
      if(response[0] == true){
        window.location.reload();
        this.router.navigate(['/dashboard']);
      }else{
        alert(response[1])
      }
    });
    }

  }

  displayedColumns: string[] = [ 'title', 'id'];
}
