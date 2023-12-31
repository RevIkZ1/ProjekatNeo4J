import { Component, OnInit } from '@angular/core';
import { AdminState } from './store/types/admin.interface';
import { Store } from '@ngrx/store';
import * as AdminActions from './store/actions/admin.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Client';
  constructor(private store: Store<AdminState>) {}
  ngOnInit(): void {
    console.log('Jel ovde?');
    let loggedIn = false;
    if (localStorage.getItem('isLoggedIn')) {
      loggedIn = true;
    } else {
      loggedIn = false;
    }
    this.store.dispatch(
      AdminActions.browserRolead({ isLoading: false, isLoggedin: loggedIn })
    );
  }
}
