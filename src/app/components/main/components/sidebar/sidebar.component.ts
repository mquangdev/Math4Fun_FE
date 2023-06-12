import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  listSidebar: Sidebar[] = [
    {
      text: 'Học',
      icon: './../../../../../assets/icons/ic-home.svg',
      routerLink: '/main/learn',
    },
    {
      text: 'Luyện tập',
      icon: './../../../../../assets/icons/ic-practice.svg',
    },
    {
      text: 'Bảng xếp hạng',
      icon: './../../../../../assets/icons/ic-rank.svg',
    },
    {
      text: 'Cửa hàng',
      icon: './../../../../../assets/icons/ic-shop.svg',
    },
    {
      text: 'Quản trị',
      icon: './../../../../../assets/icons/ic-admin.png',
      routerLink: '/main/manage',
    },
  ];
}

export class Sidebar {
  text?: string;
  icon?: string;
  routerLink?: string;
}
