import { Injectable } from '@angular/core';
import { CallbackOneParam } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';
import { Data } from '@angular/router';

// questionList should be look like
// questionList = 
//   [
//     { QuestionId: "1", QuestionName: "Q1" },
//     { QuestionId: "2", QuestionName: "Q2" },
//     { QuestionId: "3", QuestionName: "Q3" },
//     { QuestionId: "4", QuestionName: "Q4" }
//   ]

//question should be look like
// const q1 = { QuestionID: "1", Question: 'This is a question', QuestionTitle: "Q1", code: "print('this is q1')" }
// const q2 = { QuestionID: "2", Question: 'This is a question', QuestionTitle: "Q1", code: "print('this is q1')" }
// const q3 = { QuestionID: "3", Question: 'This is a question', QuestionTitle: "Q1", code: "print('this is q1')" }
// const q4 = { QuestionID: "4", Question: 'This is a question', QuestionTitle: "Q1", code: "print('this is q1')" }

@Injectable({
  providedIn: 'root'
})

/**
 * Service that used for connect with backend to get question, code
 */
export class QuestionServiceService {
  private ENDPOINT = environment.backendEndpoint;
  public questionList: any = []

  constructor(private http: HttpClient) {
  }

  getQuestionsList(callback: CallbackOneParam<any>) {
    this.freshQuestionList(() => {
      callback(this.questionList);
    })
  }

  //Update this.questionList from backend
  freshQuestionList(callback: CallbackOneParam<any>) {
    this.http.get(this.ENDPOINT + 'getAllQuestion', {

    }).subscribe((data: any) => {
      console.log(data)

      let questions: any = [];
      console.log('output:', data.output[0]._id)

      for (let i = 0; i < data.output.length; i++) {
        console.log({ "QuestionId": `${(data.output[i]._id).toString()}`, "QuestionName": `${'QID:' + (data.output[i]._id).toString()}` })
        questions.push({ "QuestionId": `${(data.output[i]._id).toString()}`, "QuestionName": `${'Question:' + (data.output[i]._id).toString()}` })
      }
      this.questionList = questions
      callback(this.questionList)
    })
  }

  /**
   * Search the question title form this.question.list
   * @param id 
   * @returns the nume of the question, if not find return "No Name"
   */
  getQuestionTilteFromLocalById(id: number) {
    for (let i = 0; i < this.questionList.length; i++) {
      console.log('run')
      console.log(this.questionList[i].QuestionId)
      if (this.questionList[i].QuestionId == id) {
        return this.questionList[i].QuestionName;
      }
    }
    return "No Name"
  }

  getQuestionByID(id: number, callback: CallbackOneParam<any>) {
    this.freshQuestionList(() => {
      console.log("getquestionbyID")

      this.http.get(
        this.ENDPOINT + 'getOneQuestion' + `${'/' + id.toString()}`
      
      ).subscribe((data: any) => {
        callback({ QuestionID: `${id}`, Question: `${data.output}`, QuestionTitle: `${this.getQuestionTilteFromLocalById(id)}`, code: `` })

      });
    });
  }

}
