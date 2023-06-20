import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RightBarService {
  private rightBarSubject = new BehaviorSubject<boolean>(true);
  public isShowRightBar$ = this.rightBarSubject.asObservable();
  constructor() {}
  setIsShowRightBar(value: boolean) {
    this.rightBarSubject.next(value);
  }
}
