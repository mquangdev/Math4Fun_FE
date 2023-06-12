import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ReuseableModule } from 'src/app/reuseable/reuseable.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPwComponent } from './forgot-pw/forgot-pw.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    StartComponent,
    SignUpComponent,
    LoginComponent,
    ForgotPwComponent,
  ],
})
export class AuthModule {}
