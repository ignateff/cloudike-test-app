import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;
  showBack: boolean = true;

  constructor(private auth: AuthService,
              private location: Location,
              private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.auth.isLoggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  logout() {
    this.auth.logout();
  }

  back() {
    if (this.showBack && this.location.path()) {
      this.location.back();
    }
  }
}
