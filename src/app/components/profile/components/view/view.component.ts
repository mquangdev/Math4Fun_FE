import { Component, OnInit } from '@angular/core';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { CommonService } from 'src/app/services/common.service';
import { NotiService } from 'src/app/services/noti.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import IMAGE from 'src/app/const/image';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  public userInfo: any;
  public anoAva = IMAGE.anoAvatar;
  public listCourse: any[] = [];
  constructor(
    private userService: UserService,
    private uploadService: UploadService,
    private noti: NotiService,
    private commonService: CommonService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getInfoUser();
    this.getListCourseByUserId();
  }
  getInfoUser() {
    this.userService.getById().subscribe((data) => {
      this.userInfo = data;
    });
  }
  getListCourseByUserId() {
    this.userService.getAllCourseByUserId().subscribe((data) => {
      this.listCourse = data;
    });
  }

  changeAvatar(e: any) {
    this.uploadService
      .uploadFile(e.target.files[0], 'avatar')
      .subscribe((data) => {
        let body = {
          id: this.userInfo.id,
          avatar: data[0],
        };
        this.userService.updateInfo(body).subscribe(
          (data) => {
            this.noti.success();
            this.getInfoUser();
            this.commonService.setChangeAvatarSource(true);
          },
          (err) => {
            this.noti.warning();
          }
        );
      });
  }

  editProfile() {
    this.router.navigate(['/main/profile/edit']);
  }
}
