export class AuthService {
  private token?: string;

  public setToken(token: string) {
    this.token = token;
  }

  public getToken() {
    return this.token;
  }
}
