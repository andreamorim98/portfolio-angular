import {Injectable} from '@angular/core';
import {filter, pairwise} from 'rxjs/operators';
import { Router, RoutesRecognized} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';

@Injectable()
export class HistoricoRotasService {

      public previousRoutePath = new BehaviorSubject<string>('');
      public currentRoutePath = new BehaviorSubject<string>('');

      constructor(
            private router: Router,
            private location: Location
      ) {

      this.previousRoutePath.next(this.location.path());
      this.router.events.pipe(
            filter(e => e instanceof RoutesRecognized),
            pairwise(),
      )
            .subscribe((event: any[]) => {
                  this.previousRoutePath.next(event[0].urlAfterRedirects);
                  this.currentRoutePath.next(event[1].urlAfterRedirects);
            });
      }

}
