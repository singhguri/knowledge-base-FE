import { OtpService } from './../../services/otp.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
})
export class OtpComponent implements OnInit {
  otpform = false;
  mobileform = true;
  mobileForm: FormGroup;
  otpForm: FormGroup;
  userId;
  mobileNumber;
  btnenable = true;
  timer;
  timeleft;
  errorMessage = '';
  password;
  private _success = new Subject<string>();
  constructor(
    private fb: FormBuilder,
    private utility: UtilityService,
    private otp: OtpService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.mobileForm = this.fb.group({
      mobile: [
        '',
        [
          Validators.pattern('^([0|+[0-9]{1,4})?([6-9][0-9]{9})$'),
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      otp: [''],
    });
    const userData = this.utility.getUserData();
    this.utility.password.subscribe((res: any) => {
      //console.log('res',res);
      this.password = res;
    });
    if (userData.mobileNo) {
      this.mobileForm.patchValue({
        mobile: userData.mobileNo,
      });
    }
    this.userId = this.utility.getUserId();
    setTimeout(() => (this.errorMessage = ''), 2000);

    this._success.subscribe((message) => (this.errorMessage = message));
    this._success
      .pipe(debounceTime(5000))
      .subscribe(() => (this.errorMessage = ''));
    // this.utility.loginstatus.subscribe((res:any)=>{
    //   ////console.log('oTP status==>',res);
    //   if(!res.otp && res.mobileNo){
    //     this.mobileForm.patchValue({
    //       mobile:res.mobileNo
    //     })
    //     this.mobileForm.updateValueAndValidity();
    //   }else{
    //     this.mobileform=true;
    //   }
    // })
  }

  resetOtp() {
    let body = {
      userid: this.userId,
      mobileno: this.mobileNumber,
      password: this.password,
      otp: '',
    };

    this.otp.userOtp(body).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastr.success('OTP has been sent to your number');
        } else {
          this.changeSuccessMessage(res.message);
        }
      },
      (error) => {
        ////console.log('error',error);
        this.changeSuccessMessage('Something Wrong Happens !');
      }
    );
  }
  sendVerificationCode(form: FormGroup, otpform) {
    if (form.invalid) return;

    if (!otpform) {
      this.mobileNumber = parseInt(form.value.mobile);
      let body = {
        userid: this.userId,
        mobileno: parseInt(form.value.mobile),
        otp: '',
      };

      this.otp.userOtp(body).subscribe(
        (res: any) => {
          if (res.success) {
            form.get('mobile').disable();
            form
              .get('otp')
              .setValidators([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(6),
              ]);
            this.otpform = true;
            // this.mobileform =false;
            this.btnenable = false;
            this.toastr.success(res.message);
            this.OTPtimer();
          } else if (res.responseCode === 0) {
            this.changeSuccessMessage(res.message);
          }
        },
        (error) => {
          this.toastr.error('Something Wrong Happpens');
        }
      );
    } else {
      // this.mobileNumber = parseInt(form.value.mobile);
      let body = {
        userid: this.userId,
        mobileno: this.mobileNumber,
        otp: form.value.otp,
        password: this.password,
      };

      this.otp.enterOtp(body).subscribe(
        (res: any) => {
          if (res.responseCode === 200) {
            this.utility.setLocalStorageOnlogin(res);
            this.utility.addScriptGTag(res.data.userId);
            this.route.navigate(['/dashboard']);
          }
          if (res.responseCode === 201) {
            this.changeSuccessMessage(res.message);
          }
        },
        (error) => {
          ////console.log('error',error)
        }
      );
    }
  }
  OTPtimer() {
    this.timeleft = 10;
    var downloadTimer = setInterval(() => {
      if (this.timeleft <= -1) {
        clearInterval(downloadTimer);
        this.btnenable = true;
      } else {
        this.timer =
          this.timeleft < 10 ? `0:0${this.timeleft}` : `0:${this.timeleft}`;
      }
      if (this.timeleft !== -1) {
        this.timeleft -= 1;
      }
    }, 1000);
  }
  // sendOtp(form){
  //   if(!form.valid)
  //   return

  // }
  submitMobileNumber() {
    this.mobileForm.get('mobile').enable();
    this.otpform = false;
    this.mobileForm.get('otp').clearValidators();
    this.mobileForm.get('otp').updateValueAndValidity();
  }
  public changeSuccessMessage(errorMessage) {
    this._success.next(errorMessage);
  }
}
