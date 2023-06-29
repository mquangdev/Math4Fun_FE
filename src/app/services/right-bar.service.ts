import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RightBarService {
  private barSubject = new BehaviorSubject<Bar>({
    right: true,
    left: true,
  });
  public isShowBar$ = this.barSubject.asObservable();
  constructor() {}
  setIsShowBar(value: Bar) {
    this.barSubject.next(value);
  }
}

export class Bar {
  right?: boolean = true;
  left?: boolean = true;
}
