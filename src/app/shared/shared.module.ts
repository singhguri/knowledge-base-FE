import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OuterHeaderNavigationComponent } from './outer-header-navigation/outer-header-navigation.component';
import { OuterFooterComponent } from './outer-footer/outer-footer.component';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchInputCenterComponent } from './search-input-center/search-input-center.component';
import { QueryTypesComponent } from './query-types/query-types.component';
import { SearchWaybillComponent } from './search-waybill/search-waybill.component';
import { ApiSpinnerComponent } from './api-spinner/api-spinner.component';
import { HeaderNavigationComponent } from './header-navigation/header-navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    NavComponent,
    OuterFooterComponent,
    OuterHeaderNavigationComponent,
    SearchInputComponent,
    SearchInputCenterComponent,
    QueryTypesComponent,
    SearchWaybillComponent,
    ApiSpinnerComponent,
    HeaderNavigationComponent,
    SidebarComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
  ],
  providers: [],
  exports: [
    NavComponent,
    SearchInputComponent,
    OuterFooterComponent,
    OuterHeaderNavigationComponent,
    QueryTypesComponent,
    SearchWaybillComponent,
    HeaderNavigationComponent,
    SidebarComponent,
    BreadcrumbComponent,
  ],
})
export class SharedModule {}
