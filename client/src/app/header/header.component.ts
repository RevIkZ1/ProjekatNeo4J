import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AdminState } from '../store/types/admin.interface';
import { Store, select } from '@ngrx/store';
import { Admin, AdminModel } from '../store/types/admin.module';
import { selectAdminFeature } from '../store/selectors/admin.selector';
import * as AdminActions from '../store/actions/admin.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  toggleMenu = false;
  showDropdown = false;
  logoImg = '../../images/logo.jpg';
  authenticated = true;
  user!: Admin | null;
  isLoggedIn!: boolean;
  user1: AdminModel;
  handleNavBar() {
    this.toggleMenu = !this.toggleMenu;
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private store: Store<AdminState>
  ) {
    this.user1 = new AdminModel();
  }

  ngOnInit(): void {
    this.store.pipe(select(selectAdminFeature)).subscribe((adminState) => {
      this.isLoggedIn = adminState.isLoggedIn;
      this.authenticated = adminState.isLoggedIn;
      const userJson = localStorage.getItem('loggedUser');
      if (userJson !== null) {
        const userObject = JSON.parse(userJson) as {
          id: number;
          username: string;
          password: string;
        };
        this.user1 = new AdminModel(
          userObject.id,
          userObject.username,
          userObject.password
        );
      }
    });
  }
  logout(): void {
    this.user = null;

    this.store.dispatch(AdminActions.logOutUser());
  }
}
