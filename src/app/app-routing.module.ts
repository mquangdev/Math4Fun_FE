import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './components/auth/start/start.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ForgotPwComponent } from './components/auth/forgot-pw/forgot-pw.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: 'start',
    component: StartComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-pw',
    component: ForgotPwComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
