import { JwtModule } from '@auth0/angular-jwt';
import { UsersModule } from './components/users/users.module';
import { FullComponent } from './layouts/full/full.component';
import { FormsModule } from '@angular/forms';
import { GlobalsX } from './services/globals';
import { SharedModule } from './shared/shared.module';
import { APIInterceptor } from './services/httpinp.service';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { ArticleHeadingService } from './services/article-heading.service';
import { KBHeadingService } from './services/kbheading.service';
import { ArticlesService } from './services/articles.service';
import { MasterService } from './services/master';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { BaseService } from './services/base';
import { MasterComponent } from './layout/master/master.component';
import { PublicComponent } from './layout/public/public.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AuthenticationModule } from './authentication/authentication.module';
import { ToastrModule } from 'ngx-toastr';
import { BlankComponent } from './layouts/blank/blank.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    MasterComponent,
    BlankComponent,
    FullComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SharedModule,
    PerfectScrollbarModule,
    FormsModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    UsersModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4201', 'foo.com', 'bar.com'],
      },
    }),
  ],
  providers: [
    BaseService,
    StorageService,
    AuthService,
    MasterService,
    ArticlesService,
    KBHeadingService,
    ArticleHeadingService,
    HttpClient,
    GlobalsX,
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
