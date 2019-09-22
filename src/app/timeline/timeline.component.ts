import {Component, OnInit} from '@angular/core';
import {TimelineService} from "./timeline.service";
import {ToastrService} from "ngx-toastr";
import {ConfigService} from "../config.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  public groups = [];
  public showSpinner: boolean = false;
  public middlePhotoPlaceholderUrl: string;
  constructor(private timelineService: TimelineService,
              private toastr: ToastrService,
              private config: ConfigService) {}

  ngOnInit() {
    this.middlePhotoPlaceholderUrl = this.config.getMiddlePhotoPlaceholderUrl()
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
