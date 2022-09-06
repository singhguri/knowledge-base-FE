import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './404/not-found.component';
import { OtpComponent } from './otp/otp.component';

export const AuthenticationRoutes: Routes = [
  {
    path: 'auth',
    children: [
      // {
      //   path: '404',
      //   component: NotFoundComponent,
      // },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login',
        },
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'otp',
        component: OtpComponent,
      },
      {
        path: 'forget',
        component: ForgetPasswordComponent,
      },
    ],
  },
];
