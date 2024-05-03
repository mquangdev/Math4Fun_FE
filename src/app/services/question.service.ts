import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_GPT, API_URL } from '../const/url';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  URL = `${API_URL}/Question`;
  URL_GPT = `${API_GPT}/api`;
  constructor(private http: HttpClient) {}
  detailQuestion(questionId: string): Observable<any> {
    return this.http.get(this.URL + '/Detail?questionId=' + questionId);
  }
  removeQuestion(questionId: string): Observable<any> {
    return this.http.delete(this.URL + '/Remove?questionId=' + questionId);
  }
  addQuestion(body: any): Observable<any> {
    return this.http.post(this.URL + '/Add', body);
  }
  updateQuestion(body: any): Observable<any> {
    return this.http.post(this.URL + '/Update', body);
  }
  addQuestionAI(body: any): Observable<any> {
    return this.http.post(this.URL_GPT + '/create-question', body);
  }
}
