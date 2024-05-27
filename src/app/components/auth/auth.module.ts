import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPwComponent } from './forgot-pw/forgot-pw.component';
import { LoginComponent } from './login/login.component';
import { ResetPwComponent } from './reset-pw/reset-pw.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StartComponent } from './start/start.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';

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
