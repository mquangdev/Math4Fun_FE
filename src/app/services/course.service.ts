import { Injectable } from '@angular/core';
import { API_URL } from '../const/url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  URL = `${API_URL}/Course`;
  constructor(private http: HttpClient) {}
  getAllCourse(): Observable<any> {
    return this.http.get(this.URL + '/GetAll');
  }
  addCourse(body: any): Observable<any> {
    return this.http.post(this.URL + '/AddCourse', body);
  }
  detailCourse(courseId: string): Observable<any> {
    return this.http.get(this.URL + '/GetDetailCourse?courseId=' + courseId);
  }
  updateCourse(body: any): Observable<any> {
    return this.http.post(this.URL + '/Update', body);
  }
  delete(id: string): Observable<any> {
    return this.http.delete(this.URL + '/Delete?courseId=' + id);
  }
}
