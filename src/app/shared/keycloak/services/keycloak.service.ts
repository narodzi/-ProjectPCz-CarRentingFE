import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Injectable } from '@angular/core';
import { tokenResult } from '../keycloakAuthrization';

declare let Keycloak: any;
@Injectable()
export class KeycloakService {
  static keycloakAuthObject: any;
  static token?: BehaviorSubject<string | null>;

  constructor() {
    KeycloakService.token = new BehaviorSubject<string | null>(null);
  }

  static init(): Promise<any> {
    KeycloakService.keycloakAuthObject = new Keycloak(environment.keyCloakConstructParams);
    KeycloakService.keycloakAuthObject.onTokenExpired = () => {
      if (environment.authConfig.tokenAutoRefresh) {
        KeycloakService.getTokenSt()
          .then(() => {
          }, (_) => {
          });
      }
    };

    KeycloakService.keycloakAuthObject.onAuthRefreshSuccess = () => {
    };

    KeycloakService.keycloakAuthObject.onAuthRefreshError = () => {
      setInterval(() => {
        KeycloakService.logout();
      }, 20000);
    };

    return new Promise((resolve, reject) => {
      KeycloakService.keycloakAuthObject.init(environment.keyCloakInitParams)
        .then(() => {
          if (environment.authDebug) {
          }
          resolve(KeycloakService.keycloakAuthObject);
        })
        .catch(() => {
          reject();
        });
    });
  }

  static logout(url: string = environment.keyCloakConstructParams.logoutUrl) {
    KeycloakService.keycloakAuthObject.logout(url);
  }

  static getUsername(): string {
    return KeycloakService.keycloakAuthObject.tokenParsed.preferred_username;
  }

  static isAuthenticated(): boolean {
    return KeycloakService.keycloakAuthObject.authenticated;
  }

  static getTokenSt(): Promise<tokenResult> {
    return new Promise((resolve, reject) => {
      if (KeycloakService.keycloakAuthObject && KeycloakService.keycloakAuthObject.token) {
        KeycloakService.keycloakAuthObject
          .updateToken(environment.authConfig.tokenValidUntilTime)
          .then((refreshed: any) => {
            if (environment.authDebug) {
              console.log('Token refreshed: ', refreshed);
            }
            KeycloakService.token?.next(KeycloakService.keycloakAuthObject.token);
            resolve({
              token: KeycloakService.keycloakAuthObject.token,
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
    return new Promise((resolve, reject) => {
      KeycloakService.keycloakAuthObject.login()
        .then((l: any) => {
          console.log('l', l)
          if (environment.authDebug) {
          }
          KeycloakService.keycloakAuthObject = environment.keyCloakConstructParams.logoutUrl;
          resolve(KeycloakService.keycloakAuthObject);
        })
        .catch(() => {
          reject();
        });
    });
  }

  getToken(): Promise<tokenResult> {
    return new Promise((resolve, reject) => {
      if (KeycloakService.keycloakAuthObject && KeycloakService.keycloakAuthObject.token) {
        KeycloakService.keycloakAuthObject
          .updateToken(environment.authConfig.tokenValidUntilTime)
          .then(() => {

            KeycloakService.token?.next(KeycloakService.keycloakAuthObject.token);
            resolve({
              token: KeycloakService.keycloakAuthObject.token,
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
    KeycloakService.keycloakAuthObject.clearToken();
  }

  getTokenSubject() {
    return KeycloakService.token;
  }

  getUserId() {
    return KeycloakService.keycloakAuthObject.tokenParsed.sub
  }

  isUserHaveAdminRole() {
    const userRoles: string[] = KeycloakService.keycloakAuthObject.tokenParsed.realm_access.roles
    if(userRoles.some(role => role === 'employee')) {
      return true
    }
    return false
  }

  isUserHaveUserRole() {
    const userRoles: string[] = KeycloakService.keycloakAuthObject.tokenParsed.realm_access.roles
    if(userRoles.some(role => role === 'user')) {
      return true
    }
    return false
  }

}
