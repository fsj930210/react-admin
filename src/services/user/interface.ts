// login
export interface ILoginParams {
  account: string;
  password: string;
  captcha: string;
  captcha_id: string;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
}

// captcha
export interface IGetCaptchaResponse {
  image: string;
  id: string;
}
export interface IGetCaptchaParams {
  width?: number;
  height?: number;
}
