import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {LoginService } from '../services/login.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private errorMessage: any;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onLogin() {
    this.loginService.loginUser(environment.baseUrl + 'login', this.loginForm.value).subscribe((response: any) => {
      if (response.status) {
        this.loginService.isLoggedIn = true;
        localStorage.setItem('userToken', response.token);
        this.router.navigate(['/order']);
      } else {
        this.errorMessage = 'Username/Password incorrect';
      }
    }, (error: any) => {
      if (error.status === 401) {
        this.errorMessage = 'Username/Password incorrect';
      } else {
        this.errorMessage = 'Something went wrong';
      }
    });
  }

}
