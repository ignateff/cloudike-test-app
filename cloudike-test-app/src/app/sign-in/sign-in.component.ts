import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {log} from "util";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signInForm = this.fb.group({
      //todo add phone validation
      'login': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  submitForm() {
    const {login, password} = this.signInForm.value;
    if(login && password){
      this.authService.login(login, password)
    }
  }

}
