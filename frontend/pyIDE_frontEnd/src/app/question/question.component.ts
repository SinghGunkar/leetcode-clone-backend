import { QuestionServiceService } from './../question-service.service';
import { Component, OnInit, ElementRef, Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  id: any;   // id of the question
  data: any;

  questionTitle: string; // title of the question
  questionContent: string;  // question content
  newQuestion: boolean = false;   // flag for the question-editor component

  role: string; // role of the user accessing the question
  isAdmin: boolean; // flag for indicating if the current user is an admin or not

  constructor(private elem: ElementRef, private router: Router, 
              private route: ActivatedRoute, private questionService: QuestionServiceService,
              private renderer: Renderer2, private auth:AuthService) {
    this.id = -1;
    this.questionTitle = "";
    this.questionContent = "";

    this.role = this.auth.getUserType();
    this.isAdmin = this.role === "admin" ? true : false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      this.questionService.getQuestionByID(this.id, (question) => {
        this.questionTitle = question.QuestionTitle;
        this.questionContent = atob(question.Question);
      
      })
    })
  } // end of ngOnInit()
}
