import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private baseApiUrl: string = 'https://saas.cloudike.com';
  private monthsNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  private phoneNumberRegExp: RegExp = /^\++\d{11}$/g;
  private loginWithEmailUrl: string = '/api/2/accounts/login/';
  private loginWithPhoneUrl: string = '/api/2/accounts/login_by_phone/';

  constructor() {
  }

  getBaseApiUrl() {
    return this.baseApiUrl;
  }

  getMonthsNames() {
    return this.monthsNames;
  }

  getPhoneNumberRegExp(){
    return this.phoneNumberRegExp;
  }

  getLoginWithEmailUrl(){
    return this.getBaseApiUrl() + this.loginWithEmailUrl;
  }

  getLoginWithPhoneUrl(){
    return this.getBaseApiUrl()+this.loginWithPhoneUrl
  }
}
