import {Component, OnInit} from '@angular/core';
import {TimelineService} from "./timeline.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  public groups = [];

  constructor(private timelineService: TimelineService) {}

  ngOnInit() {
    this.timelineService.getPhotos().subscribe((photos) => {
      this.groups = this.timelineService.groupByMonths(photos);
      this.preload(this.groups);
    }, (error) => {
      console.log('get photos error', error);
    })
  }



  preload(groups) {
    const images = [];
    groups.forEach((group) => {
      group.items.forEach((item, index) => {
        images[index] = new Image();
        images[index].src = item.image_preview.href
      })
    });
  }
}
