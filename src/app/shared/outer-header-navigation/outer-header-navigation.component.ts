import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outer-header-navigation',
  templateUrl: './outer-header-navigation.component.html',
  styleUrls: ['./outer-header-navigation.component.css'],
})
export class OuterHeaderNavigationComponent implements OnInit {
  showResponsiveMenu: boolean = false;
  isMenuCollapsed: boolean = true;
  sticky: boolean = false;
  @ViewChild('menuBar') menuBar: ElementRef;
  menuPosition: any;
  constructor(private route: Router) {}

  ngOnInit(): void {}
  ngAfterViewInit() {}

  navigate(type) {
    // console.log('svch');
    switch (type) {
      case 'login':
        this.route.navigate(['/authentication/login']);
        break;
      case 'register':
        this.route.navigate(['/authentication/signup']);
        break;
      case 'shipping':
        this.route.navigate(['/international']);
    }
  }
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    // this.menuPosition = this.menuBar.nativeElement.offsetTop;
    const windowScroll = window.pageYOffset;
    if (windowScroll >= 150) {
      // console.log('====>');
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
}
