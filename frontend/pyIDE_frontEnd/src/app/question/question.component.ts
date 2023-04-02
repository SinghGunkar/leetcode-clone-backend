import { QuestionServiceService } from './../question-service.service';
import { Component, OnInit,ElementRef,ViewChild ,Renderer2} from '@angular/core';
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
  questionTitle: string;
  questionContent: string;

  // @ViewChild('questionContentBox') questionContentBox!: ElementRef;
  // questionContentBox = this.elem.nativeElement.querySelector('.questionContentBox');  

  constructor(private elem: ElementRef,private router: Router, private route: ActivatedRoute, private questionService: QuestionServiceService,private renderer: Renderer2) {
    this.id = -1;
    this.questionTitle = "";
    this.questionContent = "";


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
