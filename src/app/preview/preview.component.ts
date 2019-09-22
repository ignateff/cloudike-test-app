import {Component, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  imgUrl: string = '';

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(map((param) => param.get('imgUrl')))
      .subscribe((imgUrl) => {
        if (imgUrl === null) {
          this.router.navigateByUrl('');
        } else {
          this.imgUrl = imgUrl
        }
      })
  }
}
