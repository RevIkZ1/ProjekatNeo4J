import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, finalize } from 'rxjs';
import { Lek } from '../store/types/lek.module';
import { LekState } from '../store/types/lek.interface';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  lekSelector,
  lekSelectorUstanova,
  lekSelectorUstanovaError,
  lekSelectorUstanovaLoading,
} from '../store/selectors/lek.selector';
import * as LekActions from '../store/actions/lek.actions';
import { LekService } from '../services/lek.service';

@Component({
  selector: 'app-lekovi',
  templateUrl: './lekovi.component.html',
  styleUrls: ['./lekovi.component.css'],
})
export class LekoviComponent implements OnInit {
  form!: FormGroup;
  form1!: FormGroup;

  isLoading$?: Observable<boolean>;
  error$?: Observable<String | null>;
  isLoggedIn!: boolean;
  authenticated = true;
  lek$?: Observable<Lek[]> | undefined;

  constructor(
    private store: Store<LekState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

    private lekService: LekService
  ) {
    this.isLoading$ = this.store.select(lekSelectorUstanovaLoading);
    this.error$ = this.store.select(lekSelectorUstanovaError);
    this.lek$ = this.store.select(lekSelectorUstanova);
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      naziv: new FormControl('', Validators.required),
      kolicina: new FormControl('', Validators.required),
    });

    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      console.log(id);
      this.store.dispatch(LekActions.getLekoviForUstanova({ id }));
    });
  }

  addLek() {
    this.route.params.subscribe(async (params) => {
      if (this.form.valid) {
        const info = this.form.value;
        const id = params['id']; // Assuming you get the ID from route params

        console.log('Lek Info:', info);

        try {
          await this.store.dispatch(
            LekActions.postLek({
              lek: {
                naziv: info.naziv,
                kolicina: info.kolicina,
              },
              id: id,
            })
          );

          this.form.reset();
        } catch (error) {
          console.error('Error while posting Lek:', error);
        }
      } else {
        alert('Molimo Vas popunite sva polja.');
      }
    });
  }
}
