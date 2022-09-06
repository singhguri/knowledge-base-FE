import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AngularGuardService {
  constructor(public auth: AuthService, public router: Router) {}
  canLoad(): boolean {
    //console.log('this.auth.isAuthenticated()',this.auth.isAuthenticated())
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['authentication/login']);
      return false;
    }
    return true;
  }
}
