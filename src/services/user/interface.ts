export interface ILoginParams {
  username: string;
  password: string;
  captcha: string;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
}
