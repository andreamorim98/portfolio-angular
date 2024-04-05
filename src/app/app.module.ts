import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {ComunicacaoProvider} from './providers/comunicacao-provider';
import {StorageProvider} from './providers/storage-provider';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpConfigInterceptor} from './interceptor/http-request.interceptor';
import {AuthGuard} from './auth-guard/auth-guard';
import {RequestErrorInterceptor} from './interceptor/request-error.interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {SpinnerModule} from './components/spinner/spinner.module';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {BnNgIdleService} from 'bn-ng-idle';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.sso_uri_intranet,
        realm: environment.realm,
        clientId: environment.client_id
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      },
    });
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    SpinnerModule,
    RouterModule,
    KeycloakAngularModule,
  ],
  providers: [
    BnNgIdleService,
    StorageProvider,
    ComunicacaoProvider,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService]
    // },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: 'AuthorizationConfig', useValue: environment },
    // { provide: BASE_PATH, useValue: environment.API_BASE_PATH },

    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestErrorInterceptor, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
