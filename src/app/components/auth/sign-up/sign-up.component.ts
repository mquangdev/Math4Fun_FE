import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    password: ['', [Validators.required]],
    fullname: ['', [Validators.required]],
    repw: ['', [Validators.required]],
    email: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private noti: NotiService,
    private router: Router
  ) {}

  signIn() {
    let body = {
      username: this.form.get('username')?.value,
      fullname: this.form.get('fullname')?.value,
      dob: this.form.get('dob')?.value + 'T15:38:01.139Z',
      password: this.form.get('password')?.value,
      email: this.form.get('email')?.value,
    };
    if (this.form.invalid) {
      this.noti.warning('Bạn chưa nhập đủ các trường');
      return;
    }
    if (this.form.get('password')?.value != this.form.get('repw')?.value) {
      this.noti.warning('Nhập lại mật khẩu chưa đúng');
      return;
    }
    this.authService.sigIn(body).subscribe(
      (data) => {
        this.noti.success('Tạo tài khoản thành công, hãy đăng nhập lại');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      (err) => {
        this.noti.warning(err.error);
      }
    );
  }
}
