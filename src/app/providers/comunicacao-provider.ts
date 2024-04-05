import {Injectable, Injector} from '@angular/core';
import {Servico} from '../enums/servicos-enum';
import {Observable} from 'rxjs';

@Injectable()
export class ComunicacaoProvider {

  constructor(private injector: Injector) { }

  public comunicar(servico: Servico, ...dados: any): Observable<any> {
    const service = this.injector.get((servico as any).api);
    const method = service[(servico as any).metodo];
    return new Observable(obs => {
      console.log(`Invocando método ${(servico as any).metodo} do serviço ${(servico as any).api.name}.`);

      if (!dados.length) dados = ''

      method.call(service, ...dados).subscribe(
        (resposta: any) => obs.next(resposta),
        (error: any) => obs.error(error) );
    });
  }


}
