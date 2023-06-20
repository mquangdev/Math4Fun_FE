import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/services/auth.service';
import { NotiService } from 'src/app/services/noti.service';
import { VerifyOtpComponent } from '../verify-otp/verify-otp.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResetPwComponent } from '../reset-pw/reset-pw.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgot-pw.component.html',
  styleUrls: ['./forgot-pw.component.scss'],
})
export class ForgotPwComponent {
  public email: string = '';

  constructor(
    private authService: AuthService,
    private nzModal: NzModalService,
    private noti: NotiService,
    private router: Router
  ) {}
  forgotPw() {
    this.authService.forgotPw(this.email).subscribe(
      (data) => {
        const modal = this.nzModal.create({
          nzContent: VerifyOtpComponent,
          nzCentered: true,
          nzFooter: null,
          nzTitle: 'Xác thực OTP',
          nzComponentParams: {
            email: this.email,
          },
        });
        modal.afterClose.subscribe((data) => {
          if (data) {
            const modal = this.nzModal.create({
              nzContent: ResetPwComponent,
              nzTitle: 'Cập nhật mật khẩu',
              nzCentered: true,
              nzFooter: null,
              nzComponentParams: {
                email: this.email,
              },
            });
            modal.afterClose.subscribe((data) => {
              if (data) {
                this.router.navigate(['/login']);
              }
            });
          }
        });
      },
      (err) => {
        this.noti.warning();
      }
    );
  }
}
