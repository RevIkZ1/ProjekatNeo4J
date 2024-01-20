import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { ActivatedRoute } from '@angular/router';

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
    private store: Store<ZdravstvenaUstanovaState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.isLoading$ = this.store.select(isLoadingZdravstvenaUstanova);
    this.error$ = this.store.select(stateZdravstvenaUstanovaSelector);
    this.zdravstveneUstanove$ = this.store.select(ZdravstvenaUstanovaSelector);
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      naziv: new FormControl('', Validators.required),
      adresa: new FormControl('', Validators.required),
      kontaktTelefon: new FormControl('', Validators.required),
    });
    this.store.pipe(select(selectAdminFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });

    this.store.dispatch(ZdravstvenaUstanovaAcions.getZdravstvenaUstanova());
  }

  addZdravstvena() {
    this.route.params.subscribe(async (params) => {
      if (this.form.valid) {
        const info = this.form.value;
        try {
          await this.store.dispatch(
            ZdravstvenaUstanovaAcions.postZdravstvena({
              zdravstvena: {
                naziv: info.naziv,
                adresa: info.adresa,
                kontaktTelefon: info.kontaktTelefon,
              },
            })
          );
          this.form.reset();
        } catch (error) {
          console.error('Error while posting Doktor:', error);
        }
      } else {
        alert('Molimo Vas popunite sva polja.');
      }
    });
  }
}
