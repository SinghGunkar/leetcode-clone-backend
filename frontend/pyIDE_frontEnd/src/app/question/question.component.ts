import { QuestionServiceService } from './../question-service.service';
import { Component, OnInit,ElementRef,ViewChild ,Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent {
  id: any;
  data: any;

  questionTitle: string;
  questionContent: string;
  newQuestion: boolean = false;

  role: string;
  isAdmin: boolean;



  // @ViewChild('questionContentBox') questionContentBox!: ElementRef;
  // questionContentBox = this.elem.nativeElement.querySelector('.questionContentBox');  

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
        
        // this.questionContentBox.
      })
    })
  }

  ngAfterViewChecked(){
    // console.log(this.questionContentBox)
    // this.renderer.setProperty(this.questionContentBox, 'innerHTML', 'ggg');  


  }
}
