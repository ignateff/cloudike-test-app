import {Component, OnInit} from '@angular/core';
import {map, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {noop} from "rxjs";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  imgUrl: string = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(map((param) => param.get('imgUrl')))
      .subscribe((imgUrl) => {
        this.imgUrl = imgUrl
      })
  }

}
