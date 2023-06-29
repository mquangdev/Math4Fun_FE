import { Component } from '@angular/core';
import { RightBarService } from 'src/app/services/right-bar.service';
@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss'],
})
export class ManageCourseComponent {
  constructor(private rightbarService: RightBarService) {
    this.rightbarService.setIsShowBar({
      left: true,
      right: false,
    });
  }
}
