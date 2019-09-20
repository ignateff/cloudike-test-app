import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {TimelineService} from "./timeline.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  public groups = [];
  constructor(private auth: AuthService, private timelineService: TimelineService) {
  }

  ngOnInit() {
    this.timelineService.getPhotos().subscribe((photos) => {
      console.log('get photos result', photos);
      this.groups = this.timelineService.groupByMonths(photos);
      console.log('groups', this.groups);
    }, (error) => {
      console.log('get photos error', error);
    })
  }

  logout() {
    this.auth.logout();
  }

}
