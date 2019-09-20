import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {log} from "util";
import {ConfigService} from "../config.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  signInType: string = 'email';

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private config: ConfigService) {
    this.setFormGroup()
  }

  ngOnInit() {
  }

  submitForm() {
    const {email, phone, password} = this.signInForm.value;
    if(this.signInType === 'email'){
      if (email && password) {
        this.authService.loginByEmail(email, password)
      }
    } else if(this.signInType==='phone'){
      if(phone && password){
        this.authService.loginByPhone(phone, password)
      }
    }

  }

  phoneValidator(){
    return (control: AbstractControl): {[key: string]: any} | null => {
      const phoneRegExp = this.config.getPhoneNumberRegExp();
      const isPhone = !Validators.pattern(phoneRegExp)(control);
      return !isPhone ? {'phoneValidator': {value: control.value}} : null;
    };
  }

  signInWith(signInType){
    this.signInType = signInType;
    this.setFormGroup();
  }

  setFormGroup(){
    if(this.signInType === 'email'){
      this.signInForm = this.fb.group({
        'email': ['', [Validators.required, Validators.email]],
        'password': ['', Validators.required]
      });
    } else if(this.signInType === 'phone'){
      this.signInForm = this.fb.group({
        'phone': ['', [Validators.required, this.phoneValidator()]],
        'password': ['', Validators.required]
      })
    }
  }

  get email() {
    return this.signInForm.get('email');
  }

  get phone(){
    return this.signInForm.get('phone');
  }

  get password() {
    return this.signInForm.get('password');
  }


}
