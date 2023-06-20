import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private selectedCourse = new BehaviorSubject<boolean>(false);
  public changeSelectedCourse$ = this.selectedCourse.asObservable();
  constructor() {}
  changeSelectedCourse(value: boolean): void {
    this.selectedCourse.next(value);
  }
}
