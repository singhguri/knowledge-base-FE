import { Component, AfterViewInit, OnInit, Input } from "@angular/core";
import { ROUTES } from "./menu-items";
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UtilityService } from "src/app/services/utility.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  @Input() showMobileMenu: boolean;
  showMenu = "";
  showSubMenu = "";
  urls: Array<string> = [];
  Url;
  submenuSelected = 0;
  menuSelectedIndex: number = null;
  subMenuSelectedIndex: number = null;
  mobileView = false;
  //actrt= ROUTES[].title;
  public sidebarnavItems: RouteInfo[] = [];
  constructor(private route: Router, private utility: UtilityService) {
    route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkMainMenuForSiblingLinks();
      }
    });
  }

  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter((sidebarnavItem) => sidebarnavItem);
    this.checkIfMobileView();
    window.addEventListener("resize", () => {
      this.checkIfMobileView();
    });
    this.checkMainMenuForSiblingLinks();
  }

  checkMainMenuForSiblingLinks() {
    let assigned = false;
    const currentActiveSiblingLinkItemIndex = this.sidebarnavItems.findIndex(
      (x) => x.isSiblingLink === true
    );
    this.sidebarnavItems.map((menuItem, index) => {
      if (menuItem.siblingLinks && menuItem.siblingLinks.length > 0) {
        const itemIndex = menuItem.siblingLinks.findIndex((x) =>
          window.location.pathname.includes(x)
        );
        if (itemIndex > -1) {
          if (
            currentActiveSiblingLinkItemIndex > -1 &&
            currentActiveSiblingLinkItemIndex !== index
          ) {
            this.sidebarnavItems[
              currentActiveSiblingLinkItemIndex
            ].isSiblingLink = false;
          }
          if (!menuItem.isSiblingLink) {
            menuItem.isSiblingLink = true;
            this.menuSelectedIndex = index;
          }
          assigned = true;
        }
      }
    });
    if (!assigned && currentActiveSiblingLinkItemIndex > -1) {
      this.sidebarnavItems[currentActiveSiblingLinkItemIndex].isSiblingLink =
        false;
      this.menuSelectedIndex = null;
    }
    this.checkSubMenuForSiblingLinks();
  }

  checkSubMenuForSiblingLinks() {
    let assigned = false;
    let currentSubitemActiveindex = this.getCurrentActiveSubItemIndex();
    this.sidebarnavItems.map((menuItem, index) => {
      if (menuItem.siblingLinks && menuItem.siblingLinks.length > 0) {
        menuItem.submenu.map((subMenuItem, subIndex) => {
          if (subMenuItem.siblingLinks && subMenuItem.siblingLinks.length > 0) {
            const itemIndex = subMenuItem.siblingLinks.findIndex((x) =>
              window.location.pathname.includes(x)
            );
            if (itemIndex > -1) {
              if (
                currentSubitemActiveindex !== null &&
                currentSubitemActiveindex.itemIndex !== index &&
                currentSubitemActiveindex.subItemIndex !== subIndex
              ) {
                this.sidebarnavItems[
                  currentSubitemActiveindex.itemIndex
                ].submenu[
                  currentSubitemActiveindex.subItemIndex
                ].isSiblingLink = false;
              }
              if (!subMenuItem.isSiblingLink) {
                subMenuItem.isSiblingLink = true;
                this.subMenuSelectedIndex = index;
              }
              assigned = true;
            }
          }
        });
      }
    });
    if (!assigned && currentSubitemActiveindex !== null) {
      this.sidebarnavItems[currentSubitemActiveindex.itemIndex].submenu[
        currentSubitemActiveindex.subItemIndex
      ].isSiblingLink = false;
      this.subMenuSelectedIndex = null;
    }
  }

  getCurrentActiveSubItemIndex() {
    let currentSubitemActiveIndex = null;
    this.sidebarnavItems.map((menuItem, index) => {
      if (menuItem.siblingLinks && menuItem.siblingLinks.length > 0) {
        const subIndex = menuItem.submenu.findIndex(
          (x) => x.isSiblingLink === true
        );
        if (subIndex > -1) {
          currentSubitemActiveIndex = {
            itemIndex: index,
            subItemIndex: subIndex,
          };
        }
      }
    });
    return currentSubitemActiveIndex;
  }

  addExpandClass(element: any) {
    // if (element === this.showMenu) {
    //   this.showMenu = '0';
    // } else {
    //   this.showMenu = element;
    // }
  }
  addActiveClass(item, i) {
    this.submenuSelected = i;
    // this.showSubMenu = element;
    // ////console.log(this.showSubMenu,'this.showSubMenu')

    //   const url = this.route.url;
    //   switch (url) {
    //     case '/payment':
    //       this.route.navigate(['/payment/shipping']);
    //       break;
    //     case '/ndr':
    //       this.route.navigate(['/ndr/action']);
    //       break;
    //     case '/order':
    //       this.route.navigate(['/order/process-orders/processing']);
    //       break;
    //     default:
    //       break;
    //   }

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  // constructor(
  //   private modalService: NgbModal,
  //   private router: Router,
  //   private route: ActivatedRoute
  // ) {

  //  let location = [];
  //  let myurl = []
  // var lastIndex = this.router.url.lastIndexOf(" ");
  // let menuUrl = this.router.url.split('/').slice(1, lastIndex);

  // for (let i = 0; i < ROUTES.length; i++) {
  //   location.push(ROUTES[i].title);
  //   if (this.router.url.includes('dashboard')) {
  //     this.addExpandClass('Dashboards');
  //   }
  // }

  ///alert(menuUrl)
  // let url = ['dashboard', 'ticketlist', 'component', 'cards', 'extra-component', 'widgets', 'forms', 'tables', 'charts',
  // 'maps', 'ecom', 'authentication', 'sample-pages', 'starter', 'timeline', 'icons'];

  checkIfMobileView() {
    if (window.innerWidth < 992) {
      this.mobileView = true;
    } else {
      this.mobileView = false;
    }
  }
}
// refreshPageSelection() {
//   if (this.router.url.includes('dashboard')) {
//     this.addExpandClass('Dashboards');
//   }
// }
// End open close
