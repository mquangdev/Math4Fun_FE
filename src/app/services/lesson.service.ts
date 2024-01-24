import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../const/url';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  URL = `${API_URL}/Lesson`;
  constructor(
    private http: HttpClient,
    private modal: NzModalService,
  ) {}
  delete(lessonId: string): Observable<any> {
    return this.http.delete(this.URL + '/Delete?id=' + lessonId);
  }
  detail(lessonId: string): Observable<any> {
    return this.http.get(this.URL + '/Detail?id=' + lessonId);
  }
  add(body: any): Observable<any> {
    return this.http.post(this.URL + '/Add', body);
  }
  update(body: any): Observable<any> {
    return this.http.post(this.URL + '/Update', body);
  }
  changeStatusLesson(body: any): Observable<any> {
    return this.http.post(this.URL + '/UpdateStatusLessonByUser', body);
  }
}
