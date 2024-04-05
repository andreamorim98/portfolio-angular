import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class RequestErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 200 && error.error && error.error.mensagem) {
          // TODO: Chamar o toast do DS
          console.error(error.error.mensagem);
        } else {
          // TODO: Chamar o toast do DS
          console.error(`Erro na comunicação para ${error.url?.replace(environment.API_BASE_PATH, '')}:
            ${error.status} - ${error.statusText}.`);
        }
        return throwError(error);
      })
    );
  }
}
