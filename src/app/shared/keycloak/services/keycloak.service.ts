import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Injectable } from '@angular/core';
import { tokenResult } from '../keycloakAuthrization';

declare let Keycloak: any;
@Injectable()
export class KeycloakService {
  static auth: any;
  static token?: BehaviorSubject<string | null>;

  constructor() {
    KeycloakService.token = new BehaviorSubject<string | null>(null);
  }

  static init(): Promise<any> {
    KeycloakService.auth = new Keycloak(environment.keyCloakConstructParams);
    KeycloakService.auth.onTokenExpired = () => {
      KeycloakService.getTokenSt()
    };

    KeycloakService.auth.onAuthRefreshError = () => {
      setInterval(() => {
        KeycloakService.logout();
      }, 20000);
    };

    return new Promise((resolve, _) => {
      KeycloakService.auth.init(environment.keyCloakInitParams)
        .then(() => {
          resolve(KeycloakService.auth);
        })
    });
  }

  static logout(url: string = environment.keyCloakConstructParams.logoutUrl) {
    KeycloakService.auth.logout(url);
  }

  static getTokenSt(): Promise<tokenResult> {
    return new Promise((resolve, _) => {
      if (KeycloakService.auth && KeycloakService.auth.token) {
        KeycloakService.auth
          .updateToken(environment.authConfig.tokenValidUntilTime)
          .then(() => {
            KeycloakService.token?.next(KeycloakService.auth.token);
            resolve({
              token: KeycloakService.auth.token,
              success: true
            }
            );
          })
          .catch(() => {
            KeycloakService.token?.next(null);
            resolve({
              token: undefined,
              success: false
            });
          });
      } else {
        KeycloakService.token?.next(null);
        resolve({
          token: undefined,
          success: false
        });
      }
    });
  }

  login(): Promise<any> {
    return new Promise((resolve, _) => {
      KeycloakService.auth.login()
        .then((l: any) => {
          KeycloakService.auth = environment.keyCloakConstructParams.logoutUrl;
          resolve(KeycloakService.auth);
        })
    });
  }

  getToken(): Promise<tokenResult> {
    return new Promise((resolve, _) => {
      if (KeycloakService.auth && KeycloakService.auth.token) {
        KeycloakService.auth
          .updateToken(environment.authConfig.tokenValidUntilTime)
          .then(() => {

            KeycloakService.token?.next(KeycloakService.auth.token);
            resolve({
              token: KeycloakService.auth.token,
              success: true
            }
            );
          })
          .catch(() => {
            KeycloakService.token?.next(null);
            resolve({
              token: undefined,
              success: false
            });
          });
      } else {
        KeycloakService.token?.next(null);
        resolve({
          token: undefined,
          success: false
        });
      }
    });
  }

  clearToken() {
    KeycloakService.auth.clearToken();
  }

  getUserId() {
    return KeycloakService.auth.tokenParsed.sub
  }

  isUserHaveAdminRole() {
    const userRoles: string[] = KeycloakService.auth.tokenParsed.realm_access.roles
    if(userRoles.some(role => role === 'employee')) {
      return true
    }
    return false
  }

  isUserHaveUserRole() {
    const userRoles: string[] = KeycloakService.auth.tokenParsed.realm_access.roles
    if(userRoles.some(role => role === 'user')) {
      return true
    }
    return false
  }

}
