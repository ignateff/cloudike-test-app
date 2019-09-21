import {Component, OnInit} from '@angular/core';
import {TimelineService} from "./timeline.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  public groups = [];
  public showSpinner: boolean = false;
  constructor(private timelineService: TimelineService,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.showSpinner = true;
    this.timelineService.getPhotos().subscribe((photos) => {
      this.groups = this.timelineService.groupByMonths(photos);
      this.preload(this.groups);
    }, (error) => {
      this.showSpinner = false;
      this.toastr.error('Image loading error: ' + error);
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
    this.showSpinner = false;
  }
}
