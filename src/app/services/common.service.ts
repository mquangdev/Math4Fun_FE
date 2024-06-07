import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StreakCurrent } from '../models/streak.models';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private selectedCourse = new BehaviorSubject<boolean>(false);
  private changeAvatar = new BehaviorSubject<boolean>(false);
  public changeSelectedCourse$ = this.selectedCourse.asObservable();
  public streakInformation = new BehaviorSubject<StreakCurrent>({
    currentStreakCount: 0,
    id: '',
    lastLessonDate: '',
    startLessonDate: '',
    user: null,
    userId: '',
  });
  public changeAvatar$ = this.changeAvatar.asObservable();
  public streakInformation$ = this.streakInformation.asObservable();
  constructor() {}
  changeSelectedCourse(value: boolean): void {
    this.selectedCourse.next(value);
  }
  setChangeAvatarSource(value: boolean): void {
    this.changeAvatar.next(value);
  }
  setStreakInformation(value: StreakCurrent): void {
    this.streakInformation.next(value);
  }
  shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array]; // Create a copy of the original array

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }
}
