import { AuthserviceService } from './authservice.service';
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthguardserviceService implements CanLoad {
  constructor(public auth: AuthserviceService, public router: Router) {}
  canLoad(): boolean {
    // console.log('this.auth.isAuthenticated()',this.auth.isAuthenticated())
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['authentication/login']);
      return false;
    }
    return true;
  }
}
