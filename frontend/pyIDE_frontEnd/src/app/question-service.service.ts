import { Injectable } from '@angular/core';
import { CallbackOneParam } from './interfaces';

const questionList = 
  [
    { QuestionId: "1", QuestionName: "Q1" },
    { QuestionId: "2", QuestionName: "Q2" },
    { QuestionId: "3", QuestionName: "Q3" },
    { QuestionId: "4", QuestionName: "Q4" }
  ]


  const q1 = {QuestionID:"1",Question:'This is a question',QuestionTitle:"Q1",code:"print('this is q1')"}
  const q2 = {QuestionID:"2",Question:'This is a question',QuestionTitle:"Q1",code:"print('this is q1')"}
  const q3 = {QuestionID:"3",Question:'This is a question',QuestionTitle:"Q1",code:"print('this is q1')"}
  const q4 = {QuestionID:"4",Question:'This is a question',QuestionTitle:"Q1",code:"print('this is q1')"}



@Injectable({
  providedIn: 'root'
})

export class QuestionServiceService {

  constructor() {

  }

  /*
  Example of question object:
  {[
  {QuestionId:'', QuestionName:''},
  {QuestionId:'', QuestionName:''},
  {QuestionId:'', QuestionName:''},
  :
  :
  {QuestionId:'', QuestionName:''}
  ]}
  
  */
  getQuestionsList(callback: CallbackOneParam<any>) {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve('success');
    //   }, 1000);
    // });


    callback(questionList)

  }

  getQuestionByID(id:number, callback: CallbackOneParam<any>) {
    callback(q1)
  }
 
}
