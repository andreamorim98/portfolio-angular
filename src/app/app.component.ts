import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {KeycloakService} from 'keycloak-angular';
import {BnNgIdleService} from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(SpinnerComponent, { static: true } ) private spinner: SpinnerComponent | undefined;

  title = 'portfolio-angular';

  constructor(
    private dialog: MatDialog,
    protected readonly keycloakService: KeycloakService,
    private bnIdle: BnNgIdleService,
  ) {
    this.spinner?.ativar();
    setTimeout(() => this.spinner?.desativar(), 2000 );
  }

  ngOnInit(): void {
    this.bnIdle.startWatching(60*15).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) this.deslogar()
    });
  }

  abrirInformacoesSistema(): void {
    // this.dialog.open(NomeComponent, { width: '800px', minHeight: '400px', maxHeight: '700px' } );
  }

  deslogar(): void {
    this.keycloakService.logout();
  }

}
