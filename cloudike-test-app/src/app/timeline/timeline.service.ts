import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {switchMap, map, groupBy, mergeMap, reduce, scan, tap} from "rxjs/operators";
import {of} from "rxjs";
import {ConfigService} from "../config.service";

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient,
              private auth: AuthService,
              private config: ConfigService) {
  }

  getPhotos() {
    const userId = this.auth.getUserId();
    const userToken = this.auth.getLocalToken();
    if (userToken && userId) {
      const url = `${this.config.getBaseApiUrl()}/api/2/users/${userId}/photos/`;
      const headerName = 'Mountbit-Auth';
      const httpOptions = {
        headers: new HttpHeaders({
          [headerName]: userToken,
          'Content-Type': 'application/json'
        })
      };
      return this.http.get(url, httpOptions).pipe(
        switchMap((result: any) => {
          const itemsUrl = result._links.items.href;
          return this.http.get(itemsUrl, httpOptions)
        }),
        map((result: any) => {
          return result._embedded.items.map((item) => {
            const {created} = item;
            const {image_middle, image_preview, image_small} = item._links;
            const created_month = new Date(created).getMonth();
            return {
              created_month,
              created,
              image_middle,
              image_preview,
              image_small
            }
          });
        })
      )
    }
  }

  groupByMonths(photos){
    const sortedResult = photos.sort((a,b)=> b.created - a.created);
    const groupedByMonths = {};
    const monthsNames = this.config.getMonthsNames();
    for(let item of sortedResult){
      if(groupedByMonths[item.created_month]){
        groupedByMonths[item.created_month].push(item);
      } else {
        groupedByMonths[item.created_month] = [item];
      }
    }
    const groups = [];
    for(let month in groupedByMonths){
      let group = {
        month: monthsNames[month],
        items: groupedByMonths[month]
      };
      groups.push(group)
    }
    return groups;
  }
}
