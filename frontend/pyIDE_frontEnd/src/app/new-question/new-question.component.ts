import { Component } from '@angular/core';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent {

  questionTitle = '';
  questionText = '';
  questionCode = '# Place the starter code here';

}
