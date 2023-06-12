import { Component } from '@angular/core';

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
      text: 'Nhiệm vụ',
      icon: './../../../assets/icons/ic-mission.svg',
    },
    {
      text: 'Người dùng',
      icon: './../../../assets/icons/ic-students.png',
    },
    {
      text: 'Cửa hàng',
      icon: './../../../assets/icons/ic-shop.svg',
    },
  ];
}

export class Detail {
  text?: string;
  icon?: string;
  routerLink?: string;
}
