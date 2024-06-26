export interface JwtPayload {
  email: string;
  sub: string; // O ID do usuário (subject)
}
