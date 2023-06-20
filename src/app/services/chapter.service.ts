import { Injectable } from '@angular/core';
import { API_URL } from '../const/url';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  URL = `${API_URL}/Chapter`;
  constructor(private http: HttpClient) {}
  add(body: any): Observable<any> {
    return this.http.post(this.URL + '/Add', body);
  }
  delete(id: string): Observable<any> {
    return this.http.delete(this.URL + '/Delete?chapterId=' + id);
  }
  detail(id: string): Observable<any> {
    return this.http.get(this.URL + '/Detail?chapterId=' + id);
  }
  update(body: any): Observable<any> {
    return this.http.post(this.URL + '/Update', body);
  }
}
