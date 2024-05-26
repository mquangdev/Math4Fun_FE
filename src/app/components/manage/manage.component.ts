import { Component } from '@angular/core';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent {
  public isSelected: boolean = false;
  public manageList: Detail[] = [
    {
      text: 'Khóa học',
      icon: './../../../assets/icons/ic-course.png',
      routerLink: '/main/manage-course',
    },
    {
      text: 'Người dùng',
      icon: './../../../assets/icons/ic-students.png',
      routerLink: '/main/manage-users',
    },
    {
      text: 'Nhiệm vụ',
      icon: './../../../assets/icons/ic-mission.svg',
      isComingSoon: true,
    },
    {
      text: 'Cửa hàng',
      icon: './../../../assets/icons/ic-shop.svg',
      isComingSoon: true,
    },
  ];
  constructor(private rightBarService: RightBarService) {
    this.rightBarService.setIsShowBar({
      left: true,
      right: false,
    });
  }
}

export class Detail {
  text?: string;
  icon?: string;
  routerLink?: string;
  isComingSoon?: boolean;
}
