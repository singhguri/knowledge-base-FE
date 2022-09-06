import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PASSWORD_VALIDATION } from './../../../_models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  subscribe: Subscription[] = [];
  showCurPass: boolean = false;
  showNewPass: boolean = false;
  showConfirmPass: boolean = false;
  constructor(
    private authSrv: AuthService,
    private loaderSrv: LoaderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  changePassword = new FormGroup({
    currentPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(PASSWORD_VALIDATION),
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(PASSWORD_VALIDATION),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(PASSWORD_VALIDATION),
    ]),
  });

  submit() {
    // this.loaderSrv.showProgressbar('Verifying information...');
    if (this.changePassword.valid) {
      const data = {
        currentPassword: this.changePassword.controls['currentPassword'].value,
        newPassword: this.changePassword.controls['newPassword'].value,
      };
      this.subscribe.push(
        this.authSrv.ChangePassword(data).subscribe(
          (m) => {
            // this.loaderSrv.hideProgressbar();
            if (m.respStatus) {
              console.log(m.model);
            } else {
              console.log(m.respMsg);
            }
          },
          (err) => {
            console.log(err);
          }
        )
      );
    } else {
      console.log(
        this.changePassword.value,
        this.changePassword.controls['currentPassword'].invalid
      );

      if (this.changePassword.controls['currentPassword'].invalid)
        this.toastr.error('Invalid Current Password', 'Error');
    }
  }

  cancel() {
    this.changePassword.reset();
  }

  ngOnDestroy() {
    this.subscribe.forEach((el) => el.unsubscribe());
  }
}
