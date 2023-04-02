import { Injectable } from '@angular/core';
import { CallbackOneParam } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private auth:AuthService,private router: Router) {
  }

  getQuestionsList(callback: CallbackOneParam<any>) {
    this.freshQuestionList(() => {
      callback(this.questionList);
    })
  }

  //Update this.questionList from backend
  freshQuestionList(callback: CallbackOneParam<any>) {
    const headers = this.auth.authTokenHeader();
    this.http.get(this.ENDPOINT + 'question/allQuestions', {headers}).subscribe((data: any) => {
      console.log(data)

      let questions: any = [];
      console.log('output:', data.data[0]._id)

      for (let i = 0; i < data.data.length; i++) {
        console.log({ "QuestionId": `${(data.data[i]._id).toString()}`, "QuestionName": `${(data.data[i].questionTitle).toString()}` })
        questions.push({ "QuestionId": `${(data.data[i]._id).toString()}`, "QuestionName": `${(data.data[i].questionTitle).toString()}` })
      }
      this.questionList = questions
      callback(this.questionList)
    })
  }

  /**
   * Search the question title form this.question.list
   * @param id 
   * @returns the name of the question, if not find return "No Name"
   */
  getQuestionTitleFromLocalById(id: number) {
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
    const headers = this.auth.authTokenHeader();
    this.freshQuestionList(() => {

      this.http.get(
        this.ENDPOINT + 'question/getQuestion/' + `${'' + id.toString()}`, {headers}
      ).subscribe((data: any) => {
        console.log("quesHTML:", data.data.questionContent)
        callback({ QuestionID: `${id}`, Question: `${data.data.questionContent}`, QuestionTitle: `${data.data.questionTitle}`, code: `` })

      });
    });
  }

  submitNewQuestion(question:any, callback:CallbackOneParam<any>){
    this.auth.adminOnly();
    let title = '' + question.title;
    let description = '' + question.description;

    let code = '' + question.code;

    console.log("description",description)
    let questionContent = {"description": description.toString(), "code":code.toString()};
    // const buf = Buffer.from(btoa(description),'base64')
    console.log('base64',btoa(description))
    console.log('bta',atob(btoa(description)))



    const headers = this.auth.authTokenHeader();

    this.http.post<any>(this.ENDPOINT + "question/createQuestion",{"questionTitle":title,"questionContent":btoa(description)}, { headers }).subscribe((data) => {
      console.log(data);

      callback(data);
      return;
    },(error)=>{
      console.log(error)
      callback(error)
    })
  }


  deleteQuestion(QID:string, callback:CallbackOneParam<any>){
    this.auth.adminOnly();

    const headers = this.auth.authTokenHeader();

    this.http.delete<any>(this.ENDPOINT + "question/deleteQuestion/" + QID.toString(), { headers })
    .subscribe((response)=>{
      // this.router.navigate(['/']);
      // window.location.reload();
      callback([true, null]);

    },(error)=>{
      callback([false, error]);
    })



  //   router.delete(
  //     "/deleteQuestion/:questionID",
  //     protect,
  //     authorize("admin"),
  //     deleteQuestion
  // )
  

  }





}

// this.http.post<any>(url, data).subscribe((response) => {
//   console.log(response);
//   let result = response;
//   if (result && result.token) {

//     console.log(result.token)
//     sessionStorage.setItem('token', result.token);
//     const headers = this.authTokenHeader();
//     // localStorage.setItem('token', result.token);
//     this.http.get<any>(this.server_api + "user/getLoggedInUser", { headers }).subscribe((user_data) => {
//       console.log(user_data);
//       sessionStorage.setItem('role', user_data.data.role);
//       sessionStorage.setItem('_id', user_data.data._id);
//       sessionStorage.setItem('name', user_data.data.name);
//       sessionStorage.setItem('email', user_data.data.email);
//       callback(true);
//       return;
//     })
//   }
//   callback(false)
//   return;
// }, (err) => {
//   callback(false)
//   return;
// })
