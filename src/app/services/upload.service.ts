import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_URL } from '../const/url';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  URL = `${API_URL}/UploadImage`;
  constructor(private http: HttpClient) {}
  uploadFile(file: any, type: string): Observable<any> {
    const formData: FormData = new FormData();
    let fileName = new Date().getTime() + file.name;
    formData.append('file', file, fileName);
    formData.append('type', type);
    return this.http
      .put(this.URL, formData)
      .pipe(map((reponse: any) => reponse));
  }
}
