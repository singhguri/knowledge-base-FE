import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './404/not-found.component';
// import {
//   SocialLoginModule,
//   SocialAuthServiceConfig,
//   SocialAuthService,
// } from 'angularx-social-login';
// import { GoogleLoginProvider } from 'angularx-social-login';

import { OtpComponent } from './otp/otp.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { Title } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '404',
        component: NotFoundComponent,
      },
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
    ]),
    NgbModule,
    ReactiveFormsModule,
    // SocialLoginModule,
    SharedModule,
    FormsModule,
    CarouselModule,
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    NotFoundComponent,
    OtpComponent,
  ],
  providers: [
    // {
    //   provide: 'SocialAuthServiceConfig',
    // useValue: {
    //   autoLogin: false,
    //   providers: [
    // {
    //   id: GoogleLoginProvider.PROVIDER_ID,
    //   provider: new GoogleLoginProvider(
    //     '269416882456-r3vfl1e83v6a2hv0m49gs41oa48ikce3.apps.googleusercontent.com'
    //   ),
    // },
    //   ],
    // } as SocialAuthServiceConfig,
    // },

    Title,
    // SocialAuthService,
  ],
})
export class AuthenticationModule {}
