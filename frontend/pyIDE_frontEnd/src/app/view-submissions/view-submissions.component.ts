import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from './../environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-submissions',
  templateUrl: './view-submissions.component.html',
  styleUrls: ['./view-submissions.component.css']
})
export class ViewSubmissionsComponent implements OnInit {
  private ENDPOINT = environment.backendEndpoint;
  questionTitle = "";
  displayedColumns: string[] = ['Name', 'codeResults'];
  submissions: any[] = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private auth: AuthService,) { }

  ngOnInit(): void {
    const questionId = this.route.snapshot.paramMap.get('questionId');
    const headers = this.auth.authTokenHeader();

    this.http.get<any>(this.ENDPOINT + 'question/getQuestion/' + `${questionId}`, { headers })
      .subscribe(data => {
        this.questionTitle = data.data.questionTitle
      });

    this.http.get<any>(this.ENDPOINT + 'submission/getSubmissions/' + `${questionId}`, { headers })
      .subscribe(data => {
        this.submissions = data.result;
      });
  }
}