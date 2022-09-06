import {
  CommonApiResponse,
  CommonApiResponseNew,
  LoginUserDetails,
} from './../../_models/interfaces/commonResponse';
import { MOBILE_NUMBER_REGEX, EMAIL_REGEX } from './../../_models/user';
import { UtilityService } from './../../services/utility.service';
import { RegisterService } from './../../services/register.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MasterService } from 'src/app/services/master';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  @Inject('url') private url: string;

  loginForm: FormGroup;
  userData;
  allDigits = /^\d+$/;
  errorMessage = '';
  showPass: boolean = false;
  private _success = new Subject<string>();
  private subscribe: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private loginservice: AuthService,
    private toastr: ToastrService,
    private authService: SocialAuthService,
    private register: RegisterService,
    private utility: UtilityService,
    private titleService: Title,
    private master: MasterService
  ) {
    this.titleService.setTitle(
      'Inventory and Shipping Management | Multi-Channel order | Bigship'
    );
  }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
    this.subscribe.push(
      this.loginForm.get('username').valueChanges.subscribe((res: any) => {
        if (res.match(this.allDigits)) {
          this.loginForm
            .get('username')
            .setValidators([
              Validators.pattern(MOBILE_NUMBER_REGEX),
              Validators.minLength(10),
              Validators.required,
            ]);
          // this.loginForm.get('username').updateValueAndValidity();
        } else {
          this.loginForm
            .get('username')
            .setValidators([
              Validators.pattern(EMAIL_REGEX),
              Validators.required,
            ]);
          // this.loginForm.get('username').updateValueAndValidity();
        }
      })
    );
    setTimeout(() => (this.errorMessage = ''), 2000);

    this._success.subscribe((message) => (this.errorMessage = message));
    this._success
      .pipe(debounceTime(5000))
      .subscribe(() => (this.errorMessage = ''));
    //   this.loadAPI = new Promise((resolve) => {
    //     console.log('resolving promise...');
    //     this.loadScript();
    // });
  }

  login(loginValue) {
    console.log('login button working');
    // loginValue.password=this.Encryption.set('123456$#@$^@1ERF',loginValue.password)

    this.subscribe.push(
      this.loginservice.Login(loginValue).subscribe(
        (res: CommonApiResponseNew<LoginUserDetails>) => {
          this.userData = res;
          console.log({ res });

          if (res.respStatus) {
            this.utility.setLocalStorageOnlogin(res);
            this.route.navigate(['/dashboard']);
          } else this.changeSuccessMessage(res.respMsg);
        },
        (error) => {
          ////console.log(error);
          // this.toastr.error(error);
          this.changeSuccessMessage(error);
        }
      )

      // this.loginservice.Login(loginValue).subscribe((res) => {
      //   if (res.respStatus) {
      //     this.utility.setLocalStorageOnlogin(res);
      //     this.master.CurrentUser = res.model;
      //     this.route.navigate(['/dashboard']);
      //   }
      // })
    );
  }

  navigateToSignup() {
    this.route.navigate([`/auth/signup`]);
  }
  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((x) => {
        let body = {
          firstname: x.firstName,
          lastname: x.lastName,
          emailid: x.email,
          password: 'pv123$$',
          addedon: new Date().toISOString(),
          RegisteredBY: 'Gmail',
          UserTypeId: 3828,
          PlanId: 6545,
          RoleID: 5302,
        };
        this.registerApi(body);
      })
      .catch((error) => {
        this.toastr.error(error);
      });
  }
  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
  //     let body = {
  //       firstname: x.firstName,
  //       lastname: x.lastName,
  //       emailid: x.email,
  //       password: 'pv123$$',
  //       addedon: new Date().toISOString(),
  //       RegisteredBY: 'Facebook',
  //       UserTypeId: 3828,
  //       PlanId: 6545,
  //       RoleID: 5302
  //     }
  //     this.registerApi(body);

  //   }).catch(error=>{
  //     ////console.log('errror in facebook auth');
  //   });
  // }
  redirectToForget() {
    this.route.navigate(['/authentication/forget']);
  }
  registerApi(body) {
    this.subscribe.push(
      this.register.registerUser(body).subscribe(
        (res: CommonApiResponse<LoginUserDetails>) => {
          if (res.success) {
            if (!res.data.isMobileVerifed) {
              this.utility.setLocalStorageOnlogin(res);
              this.utility.getMessage(res.data);
              this.route.navigate(['authentication/otp']);
            } else {
              this.utility.setLocalStorageOnlogin(res);
              this.route.navigate(['/dashboard']);
            }
          }
        },
        (error) => {
          if (error.status === 400) {
            // this.toastr.error('User Already Exists');
            this.changeSuccessMessage('User Already Exists');
          }
        }
      )
    );
  }
  public changeSuccessMessage(errorMessage) {
    this._success.next(errorMessage);
  }
  ngOnDestroy() {
    this.subscribe.forEach((el) => el.unsubscribe());
  }
}
