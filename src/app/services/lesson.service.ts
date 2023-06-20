import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../const/url';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  URL = `${API_URL}/Lesson`;
  constructor(private http: HttpClient) {}
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
}
