import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RandomColor } from 'src/app/enums/color.enums';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { CommonService } from 'src/app/services/common.service';
import { CourseService } from 'src/app/services/course.service';
import { RightBarService } from 'src/app/services/right-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  isShowBar$ = this.righbarService.isShowBar$;
  public courseDetail: any;
  constructor(
    private righbarService: RightBarService,
    private userService: UserService,
    private courseService: CourseService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.righbarService.setIsShowBar({
      right: true,
      left: true,
    });
  }
  ngOnInit(): void {
    this.commonService.changeSelectedCourse$.subscribe((data) => {
      if (data) {
        this.getDetailCourseByUserId();
      }
    });
  }

  getDetailCourseByUserId() {
    this.courseService
      .getDetailCourseByUserId(
        localStorage.getItem(KeyStorage.id_course_selected)!
      )
      .subscribe((data) => {
        this.courseDetail = data;
        if (this.courseDetail.chapterList) {
          this.courseDetail.chapterList.forEach((c: any) => {
            let indexLessonNow: number = 0;
            c.color = this.getRandomEnumValue(RandomColor);
            if (c.lessonList) {
              c.lessonList.forEach((l: any, index: number) => {
                l.marginLeft = this.getMarginLeft(index, c.lessonList.length);
                l.isLock = true;
                // Bài đầu tiên của chương
                if (index === 0) {
                  l.isLock = false;
                  l.backgroundColor = 'white';
                }
                // Các bài học đã hoàn thành
                if (l.status) {
                  indexLessonNow = index + 1;
                  l.isLock = false;
                  l.backgroundColor = '#ffc800';
                  l.textButtonColor = '#cd7900';
                  l.buttonBackgroundColor = '#ffc800';
                  l.buttonEdgeColor = '#e6a100';
                  l.textButton = 'Luyện tập +5 KN';
                  l.textTitleColor = '#cd7900';
                  l.type = 'complete';
                }
                // Các bài học chưa hoàn thành
                else {
                  l.isLock = true;
                  l.backgroundColor = '#f7f7f7';
                  l.textButtonColor = '#afafaf';
                  l.textButton = 'Khóa';
                  l.textSubtitle =
                    'Hãy hoàn thành tất cả các cấp độ phía trên để mở khóa nhé!';
                  l.textTitleColor = '#afafaf';
                  l.textSubtitleColor = '#afafaf';
                  l.buttonBackgroundColor = '#e5e5e5';
                  l.buttonEdgeColor = '#b7b7b7';
                  l.buttonRoundColor = '#afafaf';
                  l.type = 'lock';
                }
              });
            }
            // Bài học hiện tại
            let lessonNow = c.lessonList[indexLessonNow];
            if (lessonNow) {
              lessonNow.isLock = false;
              lessonNow.backgroundColor = c.color;
              lessonNow.textButton = `Bắt đầu +${lessonNow.expGained} KN`;
              lessonNow.textSubtitle = `Bài học ${indexLessonNow + 1}/${
                c.lessonList.length
              }`;
              lessonNow.textTitleColor = 'white';
              lessonNow.textSubtitleColor = 'white';
              lessonNow.textButtonColor = c.color;
              lessonNow.buttonBackgroundColor = c.color;
              lessonNow.buttonEdgeColor = c.color;
              lessonNow.type = 'now';
            }
          });
        }
      });
  }

  getRandomEnumValue<T>(enumeration: any) {
    const enumValues = Object.values(enumeration);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  }

  getMarginLeft(index: number, total: number): number {
    const x = (index / (total - 1)) * Math.PI;
    let ml: number = Math.sin(x) * 100;
    ml = index % 2 === 0 ? ml : -ml;
    return ml;
  }

  checkIsOpenLesson(index: number, chapter: any): boolean {
    let value = false;
    if (index === 0) {
      return true;
    }
    if (chapter.lessonList[index - 1].status === true) {
      return true;
    }
    localStorage.setItem(KeyStorage.chapter_id, chapter.id);
    return value;
  }

  checkIsCompleted(lesson: any, index: number) {
    return lesson.status;
  }

  viewGuid(instruction: string) {
    this.router.navigate(['/main/learn/guid']);
  }

  learn(lessonId: string, index: number, chapter: any) {
    localStorage.setItem(KeyStorage.lesson_id, lessonId);
    if (this.checkIsOpenLesson(index, chapter)) {
      this.router.navigate(['/main/learn/lesson', lessonId]);
      return;
    }
  }
}
