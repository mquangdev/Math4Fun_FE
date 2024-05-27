import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/user.service';
import { KeyStorage } from '../../../../../enums/storage.enums';
import { User } from '../../../../../models/user.model';
import { Router } from '@angular/router';
import IMAGE from 'src/app/const/image';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss'],
})
export class EditMenuComponent implements OnInit {
  public anoAvatar = IMAGE.anoAvatar;
  public listMenu = [
    {
      text: 'Tài khoản',
      routerLink: 'account',
    },
    {
      text: 'Quản lý khóa học',
      routerLink: 'course',
    },
    {
      text: 'Mật khẩu',
      routerLink: 'password',
    },
  ];
  public user: User = new User();
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.getInfoUser();
  }

  getInfoUser() {
    this.userService.getById().subscribe((data) => {
      this.user = data;
      console.log(this.user);
    });
  }
  backToProfile() {
    this.router.navigate(['/main/profile']);
  }
}
