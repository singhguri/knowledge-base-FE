import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalsX } from './../../../services/globals';
import { Component, OnInit } from '@angular/core';
import { MOBILE_NUMBER_REGEX, PASSWORD_VALIDATION } from 'src/app/_models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MasterService } from 'src/app/services/master';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  curUser: any;
  private subscribe: Subscription[] = [];
  pass: string = '';

  constructor(
    public gl: GlobalsX,
    private router: Router,
    private srv: AuthService,
    private toastr: ToastrService,
    private master: MasterService,
    private modal: NgbModal,
    private settingSrv: SettingsService
  ) {
    gl.addUser = true;
  }

  ngOnInit(): void {
    if (this.gl.user) {
      console.log(this.gl.user);
      this.curUser = this.gl.user;
      this.AddUser.controls['id'].setValue(this.curUser.id);
      this.AddUser.controls['firstName'].setValue(this.curUser.firstName);
      this.AddUser.controls['lastName'].setValue(this.curUser.lastName);
      this.AddUser.controls['emailAddress'].setValue(this.curUser.emailAddress);
      this.AddUser.controls['mobileNumber'].setValue(this.curUser.mobileNumber);
      this.AddUser.controls['username'].setValue(this.curUser.emailAddress);
      this.AddUser.controls['password'].setValue(this.curUser.password);
      this.AddUser.controls['userType'].setValue(
        this.curUser.userType > 1 ? 0 : 1
      );
      this.AddUser.controls['isActive'].setValue(this.curUser.isActive);
    } else {
      this.AddUser.reset();
      this.AddUser.controls['isActive'].setValue(true);
    }
  }

  AddUser = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl(
      { value: '', disabled: this.master.CurrentUser.userType > 1 },
      [Validators.required]
    ),
    lastName: new FormControl(
      { value: '', disabled: this.master.CurrentUser.userType > 1 },
      [Validators.required]
    ),
    emailAddress: new FormControl(
      { value: '', disabled: this.master.CurrentUser.userType > 1 },
      [Validators.required, Validators.email]
    ),
    username: new FormControl({
      value: '',
      disabled: this.master.CurrentUser.userType > 1,
    }),
    mobileNumber: new FormControl(
      { value: '', disabled: this.master.CurrentUser.userType > 1 },
      [Validators.required, Validators.pattern(MOBILE_NUMBER_REGEX)]
    ),
    userType: new FormControl(
      { value: 0, disabled: this.master.CurrentUser.userType > 1 },
      [Validators.required]
    ),
    password: new FormControl({ value: '' }, [
      Validators.required,
      Validators.pattern(PASSWORD_VALIDATION),
    ]),
    isActive: new FormControl({
      value: true,
      disabled: this.master.CurrentUser.userType > 1,
    }),
  });

  add() {
    console.log(this.AddUser.value);
    if (this.AddUser.valid) {
      let addUserValue = this.AddUser.value;
      this.subscribe.push(
        this.srv.Add(addUserValue).subscribe(
          (res) => {
            console.log({ res });

            if (res.respStatus) {
              this.toastr.success('User added successfully.', 'Success');
              setTimeout(() => {
                this.router.navigate(['/users/list-users']);
                this.AddUser.reset();
              }, 3000);
            } else this.toastr.error(res.respMsg, 'Error');
          },
          (error) => {
            this.toastr.error('Some error occured.', 'Error');
            console.log(error);
          }
        )
      );
    }
  }

  update() {
    console.log(this.AddUser.value);
    // if (this.AddUser.valid) {
    this.AddUser.controls['userType'].setValue(
      this.AddUser.controls['userType'].value ? 1 : 2
    );

    this.AddUser.controls['isActive'].setValue(
      this.AddUser.controls['isActive'].value === '1'
    );
    console.log(this.AddUser.value);

    if (this.pass) this.AddUser.controls['password'].setValue(this.pass);

    let addUserValue = this.AddUser.value;
    this.subscribe.push(
      this.srv.Update(addUserValue).subscribe(
        (res) => {
          console.log({ res });

          if (res.respStatus) {
            this.toastr.success('User updated successfully.', 'Success');
            setTimeout(() => {
              this.router.navigate(['/users/list-users']);
              this.AddUser.reset();
            }, 3000);
          } else this.toastr.error(res.respMsg, 'Error');
        },
        (error) => {
          this.toastr.error('Some error occured.', 'Error');
          console.log(error);
        }
      )
    );
    // }
  }

  cancel() {
    this.router.navigate(['/users/list-users']);
  }

  openModal(content) {
    this.modal.open(content, { size: 'sm', centered: true });
  }

  yes() {
    // get reset default password
    this.subscribe.push(
      this.settingSrv.GetByName('reset-password').subscribe(
        (res) => {
          if (res.respStatus) {
            this.pass = res.model.value;
            console.log(this.pass);
            this.toastr.success('Password reset successful', 'Success');
            this.modal.dismissAll();
          } else this.toastr.error(res.respMsg, 'Error');
        },
        (error) => {
          this.toastr.error('Some error occured.', 'Error');
          console.log(error);
        }
      )
    );

    // change password in form
  }

  ngOnDestroy() {
    this.subscribe.forEach((el) => el.unsubscribe());
  }
}
