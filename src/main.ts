import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './app/environments/environment';
import { KeycloakService } from './app/shared/keycloak/services/keycloak.service';


if (environment.authConfig.authRequired) {
  KeycloakService.init()
    .then(() => {
      console.log('Keycloak server start');
      bootstrap();
    })
    .catch(_ => {
      console.warn('Keycloak failed');
      setTimeout(() => {
        window.location.reload();
      }, 6000);
    });
} else {
  bootstrap();
}


function bootstrap() {
  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));
}