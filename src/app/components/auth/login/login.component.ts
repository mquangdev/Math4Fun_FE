import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeyStorage } from 'src/app/enums/storage.enums';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotiService } from 'src/app/services/noti.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private noti: NotiService,
    private router: Router
  ) {}
  login() {
    this.authService.login(this.form.value).subscribe(
      (data: User) => {
        if (data) {
          localStorage.setItem(KeyStorage.user_id, data.id!);
          this.router.navigate(['/main']);
        }
      },
      (error) => {
        this.noti.warning('Sai tài khoản hoặc mật khẩu');
      }
    );
  }
}
