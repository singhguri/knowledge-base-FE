import { Injectable } from '@angular/core';

@Injectable()
export class MasterService {
  Processing: boolean = false;
  CurrentUser: any;
}
