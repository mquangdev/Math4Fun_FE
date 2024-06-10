import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-continue-streak',
  templateUrl: './continue-streak.component.html',
  styleUrls: ['./continue-streak.component.css'],
})
export class ContinueStreakComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  continue() {
    this.router.navigate(['/main/learn']);
  }
}
