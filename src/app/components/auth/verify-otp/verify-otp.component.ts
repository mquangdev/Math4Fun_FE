import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subscription, timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {
  @Input() email!: string;
  public c1: string = '';
  public c2: string = '';
  public c3: string = '';
  public c4: string = '';
  public c5: string = '';
  public c6: string = '';
  public countDown!: Subscription;
  public counter = 60;
  tick = 1000;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private noti: NotiService,
    private modalRef: NzModalRef
  ) {}
  ngOnInit(): void {
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter > 0) {
        --this.counter;
      }
    });
  }
  submit() {
    let otp = `${this.c1}${this.c2}${this.c3}${this.c4}${this.c5}${this.c6}`;
    this.authService.checkOTP(this.email, otp).subscribe((data) => {
      if (data) {
        this.modalRef.close(true);
      } else {
        this.noti.warning('Mã OTP sai !');
      }
    });
  }
  resend() {
    this.authService.forgotPw(this.email).subscribe((data) => {
      this.noti.success('Mã OTP đã được gửi về email ' + this.email);
      this.counter = 60;
      this.c1 = '';
      this.c2 = '';
      this.c3 = '';
      this.c4 = '';
      this.c5 = '';
      this.c6 = '';
    });
  }
}
