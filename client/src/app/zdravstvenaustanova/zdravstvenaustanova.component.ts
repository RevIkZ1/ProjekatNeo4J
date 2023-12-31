import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  ZdravstvenaUstanova,
  ZdravstvenaUstanovaModel,
} from '../store/types/zdravstvenaustanova.module';
import { ZdravstenaUstanovaService } from '../services/zdravstvenaUstanova.service';
import { Store, select } from '@ngrx/store';
import { ZdravstvenaUstanovaState } from '../store/types/zdravstvenaustanova.interface';
import {
  ZdravstvenaUstanovaSelector,
  isLoadingZdravstvenaUstanova,
  stateZdravstvenaUstanovaSelector,
} from '../store/selectors/zdravstvenaustanova.selector';
import * as ZdravstvenaUstanovaAcions from '../store/actions/zdravstvenaustanova.actions';
import { AdminState } from '../store/types/admin.interface';
import { selectAdminFeature } from '../store/selectors/admin.selector';

@Component({
  selector: 'app-zdravstvenaustanova',
  templateUrl: './zdravstvenaustanova.component.html',
  styleUrls: ['./zdravstvenaustanova.component.css'],
})
export class ZdravstvenaustanovaComponent implements OnInit {
  form!: FormGroup;

  isLoading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  zdravstveneUstanove$?: Observable<ZdravstvenaUstanova[]>;
  isLoggedIn!: boolean;
  authenticated = true;

  constructor(
    private zdravstvenaUstanovaService: ZdravstenaUstanovaService,
    private store: Store<ZdravstvenaUstanovaState>
  ) {
    this.isLoading$ = this.store.select(isLoadingZdravstvenaUstanova);
    this.error$ = this.store.select(stateZdravstvenaUstanovaSelector);
    this.zdravstveneUstanove$ = this.store.select(ZdravstvenaUstanovaSelector);
  }
  ngOnInit(): void {
    console.log('STA BRE');
    this.store.pipe(select(selectAdminFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });
    console.log('STA BRE');

    this.store.dispatch(ZdravstvenaUstanovaAcions.getZdravstvenaUstanova());
  }
}
