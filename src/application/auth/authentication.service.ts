export interface AuthenticationService {
  login(user: any): Promise<{ access_token: string }>
  validateUser(username: string, pass: string): Promise<any>
}

export const AUTHENTICATION_SERVICE = 'AuthenticationService'
