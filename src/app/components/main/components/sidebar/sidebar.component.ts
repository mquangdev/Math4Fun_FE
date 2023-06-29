import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public role: number = 0;
  public listSidebar: Sidebar[] = [];
  public anoAvatar: string =
    './../../../../../assets/images/img-avatar-ano.png';
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.userService
      .getById(localStorage.getItem(KeyStorage.user_id)!)
      .subscribe((data) => {
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
          },
          {
            text: 'Bảng xếp hạng',
            icon: './../../../../../assets/icons/ic-rank.svg',
          },
          {
            text: 'Cửa hàng',
            icon: './../../../../../assets/icons/ic-shop.svg',
            routerLink: '/main/shop',
          },
          {
            text: 'Hồ sơ',
            icon: data.avatar ? data.avatar : this.anoAvatar,
            routerLink: '/main/profile',
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
}
