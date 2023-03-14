import { QuestionServiceService } from './../question-service.service';
import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  id: any;
  data: any;
  questionTitle:string;
  questionContent:string;
  
  private sub: any;

  constructor(private router: Router, private route: ActivatedRoute,private questionService: QuestionServiceService ){
    this.id = -1;
    this.questionTitle = "";
    this.questionContent = "";
  }

  ngOnInit(): void {
    this.questionService.getQuestionByID(this.id,(question)=>{
      this.questionTitle = question.QuestionTitle;
      this.questionContent = question.Question;
    })
  }



}
