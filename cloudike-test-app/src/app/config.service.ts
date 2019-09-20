import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseApiUrl: string = 'https://saas.cloudike.com';
  monthsNames: string[] = ['January', 'February','March','April','May','June','July','August','September','October','November','December']
  constructor() { }

  getBaseApiUrl(){
    return this.baseApiUrl;
  }

  getMonthsNames(){
    return this.monthsNames;
  }
}
