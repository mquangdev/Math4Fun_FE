import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import IMAGE from 'src/app/const/image';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public role: number = 0;
  public listSidebar: Sidebar[] = [];
  public anoAvatar = IMAGE.anoAvatar;
  public comingSoonImg = IMAGE.comingSoonImg;
  constructor(
    private userService: UserService,
    private router: Router,
    private commonService: CommonService
  ) {}
  ngOnInit(): void {
    this.generateSidebar();
    this.commonService.changeAvatar$.subscribe((data) => {
      if (data) {
        this.generateSidebar();
      }
    });
  }

  generateSidebar() {
    this.userService.getById().subscribe((data) => {
      this.role = data.role;
      this.listSidebar = [
        {
          text: 'Học',
          icon: './../../../../../assets/icons/ic-home.svg',
          routerLink: '/main/learn',
        },
        {
          text: 'Luyện tập',
          icon: './../../../../../assets/icons/ic-practice.svg',
          isComingSoon: true,
        },
        {
          text: 'Bảng xếp hạng',
          icon: './../../../../../assets/icons/ic-rank.svg',
          isComingSoon: true,
        },
        {
          text: 'Cửa hàng',
          icon: './../../../../../assets/icons/ic-shop.svg',
          // routerLink: '/main/shop',
          isComingSoon: true,
        },
        {
          text: 'Hồ sơ',
          icon: data.avatar ? data.avatar : this.anoAvatar,
          routerLink: '/main/profile',
          type: 'avatar',
        },
      ];
      if (this.role === 1) {
        this.listSidebar.push({
          text: 'Quản trị',
          icon: './../../../../../assets/icons/ic-admin.png',
          routerLink: '/main/manage',
        });
      }
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}

export class Sidebar {
  text?: string;
  icon?: string;
  routerLink?: string;
  type?: string;
  isComingSoon?: boolean;
}
