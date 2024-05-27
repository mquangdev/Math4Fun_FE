import { Component, OnInit } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'app-streak',
  templateUrl: './streak.component.html',
  styleUrls: ['./streak.component.css'],
})
export class StreakComponent implements OnInit {
  date = new Date(Date.now());
  mode: NzCalendarMode = 'month';
  streakIcon: string = '/assets/icons/ic-streak.svg';
  streakLostIcon: string = '/assets/icons/ic-lost-streak-orange.svg';
  clockIcon: string = '/assets/icons/ic-clock.svg';
  constructor() {}

  ngOnInit() {}
  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
}
