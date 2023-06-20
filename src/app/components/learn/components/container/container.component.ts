import { Component } from '@angular/core';
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
  isShowRightBar$ = this.righbarService.isShowRightBar$;
  public courseDetail: any;
  constructor(
    private righbarService: RightBarService,
    private userService: UserService,
    private courseService: CourseService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.righbarService.setIsShowRightBar(true);
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
        localStorage.getItem(KeyStorage.user_id)!,
        localStorage.getItem(KeyStorage.id_course_selected)!
      )
      .subscribe((data) => {
        this.courseDetail = data;
        if (this.courseDetail.chapterList) {
          this.courseDetail.chapterList.forEach((c: any) => {
            c.color = this.getRandomEnumValue(RandomColor);
            if (c.lessonList) {
              c.lessonList.forEach((l: any, index: number) => {
                l.marginLeft = this.getMarginLeft(index, c.lessonList.length);
              });
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
    return value;
  }

  viewGuid(instruction: string) {
    this.router.navigate(['/main/learn/guid']);
  }
}
