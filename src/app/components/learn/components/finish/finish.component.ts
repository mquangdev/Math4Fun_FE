import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { LessonService } from 'src/app/services/lesson.service';
import { NotiService } from 'src/app/services/noti.service';
import { StreakService } from 'src/app/services/streak.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
})
export class FinishComponent implements OnInit {
  @Input() time!: number;
  @Input() totalExp!: number;
  @Input() percentCorrect!: number;
  @Output() isContinueStreakUpdate$: EventEmitter<boolean> = new EventEmitter(
    false
  );
  private completeAudio = new Audio();
  public isContinueStreakUpdate: boolean = false;
  constructor(
    private router: Router,
    private lessonService: LessonService,
    private notiService: NotiService,
    private streakService: StreakService
  ) {}
  ngOnInit(): void {
    this.completeAudio.src = './../../../../../assets/audio/complete.wav';
    this.completeAudio.play();
    this.changeStatusLesson();
  }
  continue() {
    if (!this.isContinueStreakUpdate) {
      this.router.navigate(['/main/learn']);
    } else {
      this.isContinueStreakUpdate$.emit(true);
    }
  }
  changeStatusLesson() {
    let body = {
      courseId: localStorage.getItem(KeyStorage.id_course_selected),
      chapterId: localStorage.getItem(KeyStorage.chapter_id),
      lessonId: localStorage.getItem(KeyStorage.lesson_id),
      userId: localStorage.getItem(KeyStorage.user_id),
      status: true,
    };
    this.lessonService.changeStatusLesson(body).subscribe(
      (data: { streak: any; isContinueStreakUpdate: boolean }) => {
        if (data) {
          this.isContinueStreakUpdate = data.isContinueStreakUpdate;
        }
      },
      (err) => {
        this.notiService.warning();
      }
    );
  }
}
