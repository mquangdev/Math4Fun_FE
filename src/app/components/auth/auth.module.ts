import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ReuseableModule } from 'src/app/reuseable/reuseable.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPwComponent } from './forgot-pw/forgot-pw.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ResetPwComponent } from './reset-pw/reset-pw.component';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  imports: [SharedModule, NzModalModule, NzButtonModule, NzInputModule],
  declarations: [
    StartComponent,
    SignUpComponent,
    LoginComponent,
    ForgotPwComponent,
    VerifyOtpComponent,
    ResetPwComponent,
  ],
})
export class AuthModule {}
