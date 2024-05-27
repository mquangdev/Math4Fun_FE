/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StreakComponent } from './streak.component';

describe('StreakComponent', () => {
  let component: StreakComponent;
  let fixture: ComponentFixture<StreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
