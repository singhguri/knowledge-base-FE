import { debounceTime } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from './../../services/utility.service';
import { LoginService } from 'src/app/services/login.service';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
})
export class ForgetPasswordComponent implements OnInit {
  mobileForm: FormGroup;
  otpForm: FormGroup;
  setPasswordForm: FormGroup;
  mobileform: boolean = true;
  otpform: boolean = false;
  resetForm: boolean = false;
  userId;
  timer;
  mobileNumber;
  timeleft;
  errorMessage = '';
  password = {
    pass: false,
    confirmPass: false,
  };
  private _success = new Subject<string>();
  constructor(
    private fb: FormBuilder,
    private reset: LoginService,
    private utility: UtilityService,
    private toastr: ToastrService,
    private route: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle(
      'Inventory and Shipping Management | Multi-Channel order | Bigship'
    );
  }

  ngOnInit(): void {
    this.mobileForm = this.fb.group({
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^([0|+[0-9]{1,4})?([6-9][0-9]{9})$'),
        ],
      ],
      otp: [''],
    });
    this.setPasswordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: MustMatch('newPassword', 'confirmPassword') }
    );

    setTimeout(() => (this.errorMessage = ''), 2000);

    this._success.subscribe((message) => (this.errorMessage = message));
    this._success
      .pipe(debounceTime(5000))
      .subscribe(() => (this.errorMessage = ''));
  }
  sendVerificationCode(mobileForm, mobForm) {
    if (mobileForm.invalid) return;
    if (mobForm) {
      this.mobileNumber = mobileForm.value.mobile;
      let body = {
        username: mobileForm.value.mobile,
      };

      this.reset.sendOTp(body).subscribe(
        (res: any) => {
          if (res.responseCode === 200) {
            this.toastr.success(res.message);
            this.otpform = true;
            this.mobileform = false;
            this.userId = res.data;

            this.mobileForm.get('mobile').disable();
            this.mobileForm
              .get('otp')
              .setValidators([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(6),
              ]);
            this.mobileForm.get('otp').updateValueAndValidity();

            this.OTPtimer();
          }
          if (res.responseCode === 202) {
            // this.toastr.error(res.message)
            this.changeSuccessMessage(res.message);
          }
          if (res.responseCode === 201) {
            // this.toastr.error(res.message)
            this.changeSuccessMessage(res.message);
          }
        },
        (error) => {
          ////console.log('error',error)
        }
      );
    } else {
      let body = {
        UserId: this.userId,
        otp: mobileForm.value.otp,
      };

      this.reset.verifyOtp(body).subscribe(
        (res: any) => {
          if (res.responseCode === 200) {
            this.toastr.success('OTP matched Successfully');
            // this.changeSuccessMessage('OTP matched Successfully');
            this.otpform = false;
            this.resetForm = true;
          }
          if (res.responseCode === 202) {
            // this.toastr.error(res.message)
            this.changeSuccessMessage(res.message);
          }
          if (res.responseCode === 201) {
            // this.toastr.error(res.message)
            this.changeSuccessMessage(res.message);
          }
        },
        (error) => {
          ////console.log('error',error)
        }
      );
    }
  }
  submitChangePassword(setPasswordForm) {
    if (setPasswordForm.invalid) return;
    let body = {
      UserId: this.userId,
      password: setPasswordForm.value.newPassword,
    };

    this.reset.resetPassword(body).subscribe(
      (res: any) => {
        if (res.responseCode === 200) {
          this.toastr.success(res.message);
          this.route.navigate(['/authentication/login']);
        }
        if (res.responseCode === 202) {
          // this.toastr.error(res.message)
          this.changeSuccessMessage(res.message);
        }
      },
      (error) => {
        ////console.log('error',error)
      }
    );
  }
  resendOtp() {
    let body = {
      username: this.mobileNumber,
    };

    this.reset.sendOTp(body).subscribe(
      (res: any) => {
        if (res.responseCode === 200) {
          this.toastr.success(res.message);
          this.otpform = true;
          this.mobileform = false;
          this.userId = res.data;
        }
        if (res.responseCode === 202) {
          // this.toastr.error(res.message)
          this.changeSuccessMessage(res.message);
        }
        if (res.responseCode === 201) {
          // this.toastr.error(res.message)
          this.changeSuccessMessage(res.message);
        }
      },
      (error) => {
        ////console.log('error',error)
      }
    );
  }
  OTPtimer() {
    this.timeleft = 10;
    var downloadTimer = setInterval(() => {
      if (this.timeleft <= -1) {
        clearInterval(downloadTimer);
      } else {
        this.timer =
          this.timeleft < 10 ? `00:0${this.timeleft}` : `00:${this.timeleft}`;
      }
      if (this.timeleft !== -1) {
        this.timeleft -= 1;
      }
    }, 1000);
  }
  public changeSuccessMessage(errorMessage) {
    this._success.next(errorMessage);
  }
}

function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
