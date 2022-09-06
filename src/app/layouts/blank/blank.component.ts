import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styles: [],
})
export class BlankComponent {
  constructor(public router: Router) {
    // console.log(123);

    const url = this.router.url;
    switch (url) {
      case '/auth/login':
        this.router.navigate(['/auth/login']);
        break;
      case '/auth/otp':
        this.router.navigate(['/auth/otp']);
        break;
      case '/auth/signup':
        this.router.navigate(['/auth/signup']);
        break;
      case '/auth/forget':
        this.router.navigate(['/auth/forget']);
        break;
      case '/international':
        this.router.navigate(['/international']);
        break;
      case '/shipment-tracking':
        this.router.navigate(['/shipment-tracking']);
        break;
      case '/':
        this.router.navigate(['/auth/login']);
        break;
      case '/raksha-bandhan':
        this.router.navigate(['/raksha-bandhan']);
        break;
      default:
        // this.router.navigate(['/authentication/login'])
        break;
    }
  }
}
