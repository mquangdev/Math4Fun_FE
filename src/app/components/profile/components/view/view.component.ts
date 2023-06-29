import { Component, OnInit } from '@angular/core';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  public userInfo: any;
  public anoAva: string = './../../../../../assets/images/img-avatar-ano.png';
  public listCourse: any[] = [];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.getInfoUser();
    this.getListCourseByUserId();
  }
  getInfoUser() {
    this.userService
      .getById(localStorage.getItem(KeyStorage.user_id)!)
      .subscribe((data) => {
        this.userInfo = data;
      });
  }
  getListCourseByUserId() {
    this.userService
      .getAllCourseByUserId(localStorage.getItem(KeyStorage.user_id)!)
      .subscribe((data) => {
        this.listCourse = data;
      });
  }

  changeAvatar() {}
}
