import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../const/url';
import { EndPoint } from '../enums/enpoint.enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth_url = `${API_URL}${EndPoint.AUTH}`;
  constructor(private http: HttpClient) {}
  login(body: any): Observable<any> {
    return this.http.post(this.auth_url + '/login', body);
  }

  sigIn(body: any): Observable<any> {
    return this.http.post(this.auth_url + '/Create', body);
  }

  forgotPw(email: string): Observable<any> {
    return this.http.post(this.auth_url + '/ForgotPw?email=' + email, {});
  }

  checkOTP(email: string, otp: string): Observable<any> {
    return this.http.post(
      this.auth_url + '/CheckOTP?otp=' + otp + '&email=' + email,
      {}
    );
  }

  changePw(body: any): Observable<any> {
    return this.http.post(this.auth_url + '/ChangePw', body);
  }
}
