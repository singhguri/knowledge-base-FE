import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from './../../services/utility.service';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navigation',
  templateUrl: './header-navigation.component.html',
})
export class HeaderNavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};
  public showSearch = false;
  constructor(
    private modalService: NgbModal,
    // private userProfile: UserprofileService,
    private route: Router,
    private toastr: ToastrService,
    private utility: UtilityService,
    private ref: ChangeDetectorRef
  ) {}
  Name;
  mobileNo;
  emailId;
  milliseconds;
  balance;
  prices = [
    '200',
    '500',
    '1000',
    '2500',
    '5000',
    '10000',
    '25000',
    '50000',
    '100000',
  ];
  subscribe: Subscription[] = [];
  /* isLoader: boolean = false; */

  ngOnInit(): void {
    // let socialdata=JSON.parse(localStorage.getItem('socialdata'));
    let userId;
    let data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      this.Name = data.firstName + ' ' + data.lastName;
      this.mobileNo = data.mobileNo;
      // this.companyName = res.companyName;
      this.emailId = data.emailId;
      userId = data.userId;
      this.subscribe.push(
        this.utility.balance.subscribe((res: any) => {
          /* this.isLoader = false; */
          if (res.amount) {
            this.balance = Math.ceil(res.amount);
            // this.route.navigate(['/payment/recharge']);
            // this.getWalletBalance(userId);
          }
        })
      );
    } else {
      this.refresh();
    }
    /* this.isLoader = true; */

    // this.isLoader = true;
    // this.userProfile.userProfile(userId).subscribe((res: any) => {
    //   this.isLoader = false;
    //   if (res.status) {
    //     ////console.log('res',res)
    //     this.Name = res.firstName + ' ' + res.lastName;
    //     this.mobileNo = res.mobileNo;
    //     // this.companyName = res.companyName;
    //     this.emailId = res.emailId;
    //     // this.modalService.open(ShowkycstatusmodalComponent,{size:'md',centered:true});
    //     // let tokenexpires = data.tokenExpiresIn;
    //     // var date = new Date(tokenexpires);
    //     // this.milliseconds = date.getTime();
    //   }
    // }, error => {
    //   ////console.log(error);
    //   // this.autoLogOut();
    // })
  }
  ngAfterContentChecked() {
    this.ref.detectChanges();
  }
  refresh(): void {
    window.location.reload();
  }
  // autoLogOut(){
  //   ////console.log('milliseconds',this.milliseconds);
  //   this.route.navigate(['./authentication/login'])
  // }

  logout() {
    this.route.navigate(['/auth/login']);
    this.toastr.success('Successfully logged out', '', { timeOut: 2000 });
    localStorage.clear();
    sessionStorage.clear();
  }

  ngOnDestroy() {
    this.subscribe.forEach((el) => el.unsubscribe());
  }
}
