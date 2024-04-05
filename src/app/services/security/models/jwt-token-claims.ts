import {Util} from './util';

export class JwtTokenClaims {
  private static readonly ISSUER: string = 'iss';
  private static readonly NOT_BEFORE: string = 'nbf';
  private static readonly ISSUED_AT: string = 'iat';
  private static readonly EXPIRATION: string = 'exp';
  private static readonly SUBJECT: string = 'sub';
  private static readonly AUDIENCE: string = 'aud';
  private static readonly ID: string = 'jti';

  private claims: Map<string, string>;

  constructor(claimsObj: any) {
    this.claims = new Map();

    for (const propName of Object.keys(claimsObj)) {
      this.claims.set(propName, claimsObj[propName]);
    }
  }

  public getIssuer(): string {
    return <string>this.claims.get(JwtTokenClaims.ISSUER);
  }

  public getNotBefore(): string {
    return <string>this.claims.get(JwtTokenClaims.NOT_BEFORE);
  }

  public getIssuedAt(): string {
    return <string>this.claims.get(JwtTokenClaims.ISSUED_AT);
  }

  public getIssuedAtDate(): Date | undefined {
    const issuedAt: string = this.getIssuedAt();

    if ((!Util.isDefined(issuedAt)) || (issuedAt.length === 0)) return;

    let date: Date = new Date(0);
    date.setUTCSeconds(+issuedAt);

    return date;
  }

  /**
   * Retorna quantos minutos já se passaram desde que o token
   * foi gerado
   */
  public getTimeSinceIssued(): number | undefined {
    const issuedAt: Date | undefined = this.getIssuedAtDate();

    if (!issuedAt) return;

    return Util.convertSecsToMins((new Date().valueOf() - issuedAt.valueOf()) / 1000);
  }

  public getExpirationAt(): string {
    return <string>this.claims.get(JwtTokenClaims.EXPIRATION);
  }

  public getExpirationAtDate(): Date | null {
    const expirationAt: string = this.getExpirationAt();

    if ((!Util.isDefined(expirationAt)) || (expirationAt.length === 0)) return null;

    let date: Date = new Date(0);
    date.setUTCSeconds(+expirationAt);
    return date;
  }

  /**
   * Retorna o tempo em minutos para o token expirar
   */
  public getExpirationTime(): number {
    const issuedAt: string = this.getIssuedAt();
    const expirationAt: string = this.getExpirationAt();

    if ((!Util.isDefined(issuedAt)) || (issuedAt.length === 0) &&
      (!Util.isDefined(expirationAt)) || (expirationAt.length === 0)) {
      return -1;
    }

    return Util.convertSecsToMins(+expirationAt - +issuedAt);
  }

  public getSubject(): string {
    return <string>this.claims.get(JwtTokenClaims.SUBJECT);
  }

  public getAudience(): string {
    return <string>this.claims.get(JwtTokenClaims.AUDIENCE);
  }

  public getId(): string {
    return <string>this.claims.get(JwtTokenClaims.ID);
  }

  public getRoles(): string[] {
    let obj: any = this.claims.get("resource_access");

    return obj.resource_local.roles;
  }
}
