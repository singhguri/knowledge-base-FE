import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MasterService } from './master';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(public master: MasterService, private router: Router) {}
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    this.master.Processing = false;
    if (err.status === 401 || err.status === 403) {
      //navigate /delete cookies or whatever
      // console.log("errror");
      if (!this.router.url.includes('/public'))
        this.router.navigateByUrl(`/public/login`);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }
    // console.log(err.status);
    return throwError(err);
  }
  private dataHandler(event: HttpEvent<any>) {
    //handle your auth error or rethrow
    // this.master.Processing=false;
    if (event instanceof HttpResponse) {
      // console.log("event--->>>", event);
    }
    return event;
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var authReq;
    let headers;
    if (this.master.CurrentUser) {
      authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.master.CurrentUser?.password,
        }),
      });

      return next.handle(authReq).pipe(
        map((x) => this.dataHandler(x)),
        catchError((x) => this.handleAuthError(x))
      );
    } else {
      const authReq = req.clone({});
      return next
        .handle(authReq)
        .pipe(catchError((x) => this.handleAuthError(x)));
    }
  }
}
