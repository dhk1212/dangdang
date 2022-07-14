import jwt_decode from 'jwt-decode';

export type JwtToken = {
  sub: string;
  email_verified: boolean;
  iss: string;
  'cognito:username': string;
  username?:string;
  preferred_username: string;
  call_id: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  exp: number;
  iat: number;
  email: string;
}

export const parseJwt = (token: string | undefined): JwtToken => {
  if (!token) throw new Error('Not Authorized');
  return jwt_decode(token);
};
