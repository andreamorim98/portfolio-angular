import { JwtHelperService } from '@auth0/angular-jwt';

import { JwtTokenClaims } from "./jwt-token-claims";

export class JwtToken {
	public token: string | null = null;
	public recursos: string[] | null = null;
	public tempoMinimoRenovacao: number | null = null;

	getClaims(jwtHelperService: JwtHelperService): JwtTokenClaims {
		return new JwtTokenClaims(jwtHelperService.decodeToken(this.token));
	}
}
