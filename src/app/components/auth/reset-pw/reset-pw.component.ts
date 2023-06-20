import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/services/auth.service';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-reset-pw',
  templateUrl: './reset-pw.component.html',
  styleUrls: ['./reset-pw.component.scss'],
})
export class ResetPwComponent {
  @Input() email: string = '';
  public pw: string = '';
  public rePw: string = '';

  constructor(
    private modalRef: NzModalRef,
    private noti: NotiService,
    private authService: AuthService
  ) {}
  cancel() {
    this.modalRef.close();
  }
  ok() {
    if (!this.pw.trim() || !this.rePw.trim()) {
      this.noti.warning('Xin vui lòng nhập đủ các trường');
      return;
    } else {
      if (this.pw.trim() != this.rePw.trim()) {
        this.noti.warning('Nhập lại sai mật khẩu');
        return;
      } else {
        let body = {
          email: this.email,
          password: this.pw,
        };
        this.authService.changePw(body).subscribe(
          (data) => {
            this.noti.success('Đổi mật khẩu thành công, mời bạn đăng nhập lại');
            this.modalRef.close(true);
          },
          (err) => {
            this.noti.warning();
          }
        );
      }
    }
  }
}
