export interface IUserPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
