import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../const/url';

@Injectable({
  providedIn: 'root',
})
export class StreakService {
  URL = `${API_URL}/Streak`;
  constructor(private httpClient: HttpClient) {}
  getCurrentStreak(): Observable<any> {
    return this.httpClient.get(`${this.URL}/CurrentStreak`);
  }
  getStreakHistory(startDate?: string, endDate?: string): Observable<any> {
    let url = `${this.URL}/GetStreakHistory`;
    if (startDate && !endDate) {
      url += `?startDate=${startDate}`;
    }
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }
    if (!startDate && endDate) {
      url += `?endDate=${endDate}`;
    }
    return this.httpClient.get(url);
  }
}
