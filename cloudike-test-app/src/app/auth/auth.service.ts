import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ConfigService} from "../config.service";

export type AuthSuccessResult = {
  created: number,
  device_description: string,
  expires: number,
  id: string,
  login: string,
  name: string
  offer_url: string,
  token: string,
  user_eid: number
  userid: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDataKey: string = 'cloudike-test-app_user-data';

  constructor(private http: HttpClient,
              private router: Router,
              private config: ConfigService) {
  }

  login(login: string, password: string) {
    if (this.isLoginEmail(login)) {
      this.loginByEmail(login, password)
    } else if (this.isLoginPhone(login)) {
      this.loginByPhone(login, password)
    } else {
      console.log('wrong data');
    }
  }

  logout() {
    this.clearUserData();
    if (!this.getLocalToken()) {
      this.router.navigateByUrl('/sign-in');
    }
  }

  isLoggedIn() {
    return !!this.getLocalToken();
  }

  private loginByEmail(email: string, password: string) {
    const url = `${this.config.getBaseApiUrl()}/api/2/accounts/login/`;
    this.http.post(url, {email, password})
      .subscribe((result: AuthSuccessResult) => {
        const {token, userid} = result;
        if (token) {
          this.saveUserDataLocally({token, userid});
          this.router.navigateByUrl('');
        }
      }, (error) => {
        this.clearUserData();
        console.log('error', error);
      })
  }

  private loginByPhone(phone: string, password: string) {
    console.log('login by phone', phone);
  }

  private isLoginEmail(login: string) {
    return true;
  }

  private isLoginPhone(login: string) {
    return false;
  }

  private saveUserDataLocally({token, userid}) {
    const userData = {token, userid};
    const userDataString = JSON.stringify(userData);
    if (userDataString) {
      try {
        window.localStorage.setItem(this.userDataKey, userDataString)
      } catch (e) {
        console.log('error of saving user data');
      }
    }
  }

  private clearUserData() {
    try {
      window.localStorage.removeItem(this.userDataKey);
    } catch (e) {
      console.log('error of clearing user data');
    }
  }

  private getUserData() {
    let userData = null;
    try {
      userData = JSON.parse(window.localStorage.getItem(this.userDataKey));
    } catch (e) {
      console.log('error of getting user token', e);
    }
    return userData;
  }

  public getLocalToken() {
    const userData = this.getUserData();
    if (userData !== null) {
      return this.getUserData().token;
    }
  }

  public getUserId() {
    const userData = this.getUserData();
    if (userData !== null) {
      return this.getUserData().userid;
    }
  }
}
