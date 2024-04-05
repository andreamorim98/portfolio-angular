import {DatePipe} from '@angular/common';

export class Util {
  public static isDefined(dado: any): boolean {
    return (dado) && (dado !== 'undefined') && (dado !== 'null');
  }

  public static isBlank(dado: any): boolean {
    const text: string = dado + '';
    return !text.length || !text.trim().length;
  }

  public static isEmpty(dado: any): boolean {
    return (!Util.isDefined(dado)) || (this.isBlank(dado));
  }

  public static isNotEmpty(dado: any): boolean {
    return !Util.isEmpty(dado);
  }

  public static dateToString(d: Date): string {
    const datePipe = new DatePipe('en-US');

    return datePipe.transform(d, 'yy-MM-dd\'T\'HH:mm:ss');
  }

  public static dateToStringBr(d: Date): string {
    const datePipe = new DatePipe('pt-BR');
    return datePipe.transform(d, 'dd/MM/yyyy');
  }

  public static convertSecsToMins(time: number): number {
    return Math.floor(time / 60);
  }

  /**
   * Converte o JSON para String
   */
  public static objetoParaJson(entity: any): string {
    return JSON.stringify(entity);
  }

  /**
   * Converte a String no formato JSON para Objeto
   */
  public static jsonParaObjeto(str: string): any {
    return JSON.parse(str);
  }

  public static sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * dateToJson - Converte a Data para objeto Json
   */
  public static dateToJson(d: Date) {
    return {
      date: {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()
      }
    };
  }

  /**
   * Converte a string de SIM ('S') e NAO ('N') para boolean.
   */
  public static convertSNtoBool(valor: any): boolean {
    if (typeof valor === 'boolean') {
      return valor;
    }
    if (typeof valor === 'string') {
      return valor === 'S';
    }
    return false;
  }

  /**
   * Converte o boolean para string de SIM ('S') e NAO ('N').
   */
  public static convertBoolToSN(valor: any): string {
    const sim = 'S';
    const nao = 'N';
    if (typeof valor === 'boolean') {
      return valor ? sim : nao;
    }
    if (typeof valor === 'string') {
      return valor === 'true' ? sim : nao;
    }
    return nao;
  }

  public static dataReferenciaToDate(d: Date): Date {
    const dataNova: any = d;
    let dataSplit;
    let retorno: boolean = true;
    try {
      dataSplit = dataNova.split('-');
    } catch (error) {
      retorno = false;
    }
    return retorno ? new Date(Number(dataSplit[0]), Number(dataSplit[1] - 1), Number('1')) : d;
  }

  public static converterEmData(dataBr: string) {
    if (dataBr !== null) {
      const dataStr = dataBr.substring(6, 10) + '-' + dataBr.substring(3, 5) + '-' + dataBr.substring(0, 2);
      return new Date(dataStr);
    }
    return null;
  }

  public static somenteNumeros(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));

  }
}
