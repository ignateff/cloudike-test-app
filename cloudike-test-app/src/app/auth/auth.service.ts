import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {ConfigService} from "../config.service";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";

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
  isLoggedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient,
              private router: Router,
              private config: ConfigService) {
    if(this.isLoggedIn()){
      this.isLoggedIn$.next(true)
    }
  }

  logout() {
    this.isLoggedIn$.next(false);
    this.clearUserData();
    if (!this.getLocalToken()) {
      this.router.navigateByUrl('/sign-in');
    }
  }

  isLoggedIn() {
    return !!this.getLocalToken();
  }

  public loginByEmail(email: string, password: string) {
    const phone = '';
    return this.login({email, password, phone})
  }

  public loginByPhone(phone: string, password: string) {
    const email = '';
    return this.login({phone, password, email})
  }

  private login({email, phone, password}) {
    let loginObservable$ = null;
    if (email) {
      loginObservable$ = this.http.post(this.config.getLoginWithEmailUrl(), {email, password})
    }
    if (phone) {
      loginObservable$ = this.http.post(this.config.getLoginWithPhoneUrl(), {phone, password})
    }
    if (loginObservable$) {
      return loginObservable$.pipe(
        tap(this.loginSucess),
        catchError(this.handleError)
      )
    }
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

  private handleError = (errorResponse: HttpErrorResponse) => {
    this.clearUserData();
    const errorMsg = errorResponse.statusText;
    return throwError(errorMsg);
  };

  private loginSucess = (response: AuthSuccessResult) =>{
    const {token, userid} = response;
    if (token) {
      this.isLoggedIn$.next(true);
      this.saveUserDataLocally({token, userid});
      this.router.navigateByUrl('');
    }
  };

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
