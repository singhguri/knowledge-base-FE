import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';
import { GlobalsX } from './../../services/globals';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
  animations: [
    trigger('routeAnimation', [
      transition('1 => 2, 2 => 3', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(100%)' })),
        query(
          ':enter, :leave',
          style({ position: 'absolute', top: 0, left: 0, right: 0 })
        ),
        // animate the leave page away
        group([
          query(':leave', [
            animate(
              '0.3s cubic-bezier(.35,0,.25,1)',
              style({ transform: 'translateX(-100%)' })
            ),
          ]),
          // and now reveal the enter
          query(
            ':enter',
            animate(
              '0.3s cubic-bezier(.35,0,.25,1)',
              style({ transform: 'translateX(0)' })
            )
          ),
        ]),
      ]),
      transition('3 => 2, 2 => 1', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(-100%)' })),
        query(
          ':enter, :leave',
          style({ position: 'absolute', top: 0, left: 0, right: 0 })
        ),
        // animate the leave page away
        group([
          query(':leave', [
            animate(
              '0.3s cubic-bezier(.35,0,.25,1)',
              style({ transform: 'translateX(100%)' })
            ),
          ]),
          // and now reveal the enter
          query(
            ':enter',
            animate(
              '0.3s cubic-bezier(.35,0,.25,1)',
              style({ transform: 'translateX(0)' })
            )
          ),
        ]),
      ]),
    ]),
  ],
})
export class MasterComponent implements OnInit {
  constructor(
    public gl: GlobalsX,
    private router: Router,
    private storage: StorageService
  ) {
    const url = this.router.url;
    switch (url) {
      case '/authentication/login':
        this.router.navigate(['/auth/login']);
        break;
      case '/authentication/otp':
        this.router.navigate(['/auth/otp']);
        break;
      case '/authentication/signup':
        this.router.navigate(['/auth/signup']);
        break;
      case '/authentication/forget':
        this.router.navigate(['/auth/forget']);
        break;
      case '/international':
        this.router.navigate(['/international']);
        break;
      case '/shipment-tracking':
        this.router.navigate(['/shipment-tracking']);
        break;
      case '/':
        this.router.navigate(['/support']);
        break;
      case '/raksha-bandhan':
        this.router.navigate(['/raksha-bandhan']);
        break;
      default:
        // this.router.navigate(['/authentication/login'])
        break;
    }
  }

  @Input() title: string = this.gl.title;

  ngOnInit(): void {}

  HideSolution() {
    this.gl.showSolution = false;
    this.router.navigateByUrl('/support');
  }
}
