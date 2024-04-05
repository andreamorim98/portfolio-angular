import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable( { providedIn: 'root' } )
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {

    // A biblioteca do keycloak coloca o token no header automaticamente

    if (environment.apikey) {
      request = request.clone({headers: request.headers.set('apikey', environment.apikey)});
    }

    request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});

    request = request.clone({headers: request.headers.set('Accept', 'application/json')});

    request = request.clone({headers: request.headers.set('Content-Security-Policy', 'upgrade-insecure-requests')});

    return next.handle(request);
  }

}
