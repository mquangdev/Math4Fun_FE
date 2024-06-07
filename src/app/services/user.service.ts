import { Injectable } from '@angular/core';
import { API_URL } from '../const/url';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL = `${API_URL}/User`;
  COURSE_URL = `${API_URL}/Course`;
  constructor(private httpClient: HttpClient) {}
  getById(anotherUserId?: string): Observable<any> {
    let url = `${this.URL}/GetById`;
    if (anotherUserId) url += `?anotherUserId=${anotherUserId}`;
    return this.httpClient.get(url);
  }
  getAllCourseByUserId(anotherUserId?: string): Observable<any> {
    let url = `${this.COURSE_URL}/GetAllCourseByUserId`;
    if (anotherUserId) url += `?anotherUserId=${anotherUserId}`;
    return this.httpClient.get(url);
  }
  registerCourse(body: any): Observable<any> {
    return this.httpClient.post(this.COURSE_URL + '/RegisterCourse', body);
  }
  updateInfo(body: any): Observable<any> {
    return this.httpClient.post(this.URL + '/Update', body);
  }
  getAllUsers(page: number, limit: number, keyword?: string): Observable<any> {
    return this.httpClient.get(
      this.URL + `/GetAll?page=${page}&limit=${limit}&keyword=${keyword}`
    );
  }
}
