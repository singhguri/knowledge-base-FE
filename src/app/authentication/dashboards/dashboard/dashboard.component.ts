import { Subject } from 'rxjs';
import { UtilityService } from './../../../services/utility.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ComponentRef,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  ComponentFactory,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  userId: number;
  showBanner: boolean = false;
  data: SafeHtml;
  private destroy$ = new Subject();
  componentRef: ComponentRef<any>;
  @ViewChild('tabContainer', { read: ViewContainerRef }) container;
  constructor(
    private utility: UtilityService,
    private resolver: ComponentFactoryResolver
  ) {}
  ngOnInit() {
    this.userId = this.utility.getUserId();
    console.log(this.userId);

    // this.addorder
    //   .verifyCompanyAvailable(this.userId)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((res: any) => {
    //     if (res.responseCode === 200) {
    //       this.showBanner = res.success;
    //       if (!this.showBanner) {
    //         this.container.clear();
    //         this.loadComponent(KycBannerComponent);
    //       }
    //     }
    //   });
  }
  loadComponent(component) {
    //   console.log('==>')
    const factory: ComponentFactory<any> =
      this.resolver.resolveComponentFactory(component);

    this.componentRef = this.container.createComponent(factory);

    // this.componentRef.instance.type = type;

    // this.componentRef.instance.output.subscribe(event => console.log(event));
    // this.router.navigateByUrl(type);
    // this.active = type;
  }
  ngAfterViewInit() {}
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
