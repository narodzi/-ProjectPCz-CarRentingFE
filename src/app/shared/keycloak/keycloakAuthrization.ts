import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { KeycloakService } from './services/keycloak.service';
import { environment } from 'src/app/environments/environment';

@Injectable()
export class KeycloakAuthorization implements HttpInterceptor {


  constructor(private keycloakService: KeycloakService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (environment.authConfig.authRequired === true) {
      const tokenPromise: Promise<tokenResult> = this.keycloakService.getToken();
      const tokenObservable: Observable<tokenResult> = from(tokenPromise);
      return tokenObservable.pipe(
        concatMap(tokenResult => {
          if (tokenResult.success === true) {
            if (environment.authConfig.authHttp === true) {
              const clonedReq = req.clone({
                headers: req.headers.append('Authorization', 'Bearer ' + tokenResult.token)
                                    .append('Accept', ['application/json', 'text/plain'])
              });
              return next.handle(clonedReq);
            } else {
              return next.handle(req);
            }
          } else {
            this.keycloakService.clearToken();
            return next.handle(req);
          }
        }));
    } else {
      const clonedReq = req.clone({
        headers: req.headers.append('Accept', ['application/json', 'text/plain'])
      });
      if (environment.authConfig.authHttp === true) {
        return next.handle(clonedReq);
      } else {
        return next.handle(req);
      }
    }
  }
}

export interface tokenResult {
  success: boolean,
  token: any
}