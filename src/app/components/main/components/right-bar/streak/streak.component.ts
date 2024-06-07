import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import {
  StreakCurrent,
  StreakHistory,
  StreakUpdateResponse,
} from 'src/app/models/streak.models';
import { StreakService } from 'src/app/services/streak.service';

@Component({
  selector: 'app-streak',
  templateUrl: './streak.component.html',
  styleUrls: ['./streak.component.scss'],
})
export class StreakComponent implements OnInit {
  public date = new Date(Date.now());
  public mode: NzCalendarMode = 'month';
  public streakIcon: string = '/assets/icons/ic-streak.svg';
  public streakLostIcon: string = '/assets/icons/ic-lost-streak-orange.svg';
  public clockIcon: string = '/assets/icons/ic-clock.svg';
  public iconFlag: string = '/assets/icons/flag.svg';
  public streakCurrent?: StreakUpdateResponse;
  public listStreak: {
    startDate: Date;
    endDate: Date;
  }[] = [];
  constructor(private streakService: StreakService) {}

  pushToListStreak(startDate: string, endDate: string) {
    if (
      this.listStreak.indexOf({
        startDate: new Date(new Date(startDate).setHours(0, 0, 0)),
        endDate: new Date(new Date(endDate).setHours(23, 59, 59)),
      }) === -1
    ) {
      this.listStreak.push({
        startDate: new Date(new Date(startDate).setHours(0, 0, 0)),
        endDate: new Date(new Date(endDate).setHours(23, 59, 59)),
      });
    }
  }

  getStreakCurrent() {
    this.streakService.getCurrentStreak().subscribe((data) => {
      this.streakCurrent = data;
      if (
        this.streakCurrent &&
        this.streakCurrent?.streak?.currentStreakCount > 0
      ) {
        this.pushToListStreak(
          this.streakCurrent.streak.startLessonDate,
          this.streakCurrent.streak.lastLessonDate
        );
      }
    });
  }
  ngOnInit() {
    this.getStreakCurrent();
    this.getHistoryStreak(this.date);
  }

  getHistoryStreaksOfMonth(startDate: string, endDate: string) {
    this.streakService
      .getStreakHistory(startDate, endDate)
      .subscribe((data: StreakHistory[]) => {
        if (data && data.length > 0) {
          data.forEach((streak) => {
            if (streak.startDate && streak.endDate) {
              this.pushToListStreak(streak.startDate, streak.endDate);
            }
          });
        }
      });
  }

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
  // === Streak History ===
  checkIsTheDayHasStreak(checkDate: Date): boolean {
    let check = false;
    this.listStreak.forEach((streak) => {
      if (
        new Date(new Date(checkDate).setHours(0, 0, 1)) <=
          new Date(streak.endDate) &&
        new Date(new Date(checkDate).setHours(0, 0, 1)) >=
          new Date(streak.startDate)
      ) {
        check = true;
      }
    });
    return check;
  }
  selectChange(e: any) {
    this.getHistoryStreak(new Date(e));
  }
  getHistoryStreak(date: Date) {
    let { startDate, endDate } = this.getStartAndEndDate(date);
    this.getHistoryStreaksOfMonth(startDate, endDate);
  }
  getStartAndEndDate(date: Date) {
    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return {
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    };
  }
  // === End Streak History ===
}
