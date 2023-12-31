import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AdminState } from '../store/types/admin.interface';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  selectorLoading,
  selectorLoggedin,
} from '../store/selectors/admin.selector';
import * as UserActions from '../store/actions/admin.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoading$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService,
    private store: Store<AdminState>
  ) {
    this.isLoading$ = this.store.pipe(select(selectorLoading));
    this.isLoggedIn$ = this.store.pipe(select(selectorLoggedin));
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  login(): void {
    const credentials = this.form.value;
    console.log(credentials);
    this.store.dispatch(
      UserActions.loginUser({
        user: {
          username: credentials.username,
          password: credentials.password,
        },
      })
    );
  }
}
