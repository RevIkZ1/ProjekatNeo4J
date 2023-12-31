import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { PomocnoOsoblje } from '../store/types/pomocnoosoblje.module';
import { Store } from '@ngrx/store';
import { PomocnoOsoboljeState } from '../store/types/pomocnoosoblje.interface';
import { ActivatedRoute } from '@angular/router';
import { PomocnoOsobljeService } from '../services/pomocnoosoblje.service';
import {
  pomocnoOsobljeSelector,
  pomocnoOsobljeSelectorUstanova,
  pomocnoOsobljeSelectorUstanovaError,
  pomocnoOsobljeSelectorUstanovaLoading,
} from '../store/selectors/pomocnoosoblje.selector';
import * as PomocnoOsobljeActions from '../store/actions/pomocnoosoblje.actions';

@Component({
  selector: 'app-pomocnoosoblje',
  templateUrl: './pomocnoosoblje.component.html',
  styleUrls: ['./pomocnoosoblje.component.css'],
})
export class PomocnoosobljeComponent implements OnInit {
  form!: FormGroup;
  form1!: FormGroup;

  isLoading$?: Observable<boolean>;
  error$?: Observable<String | null>;
  isLoggedIn!: boolean;
  authenticated = true;
  pomocnoosoblje$?: Observable<PomocnoOsoblje[]> | undefined;
  constructor(
    private store: Store<PomocnoOsoboljeState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

    private pomocnoOsobljeService: PomocnoOsobljeService
  ) {
    this.isLoading$ = this.store.select(pomocnoOsobljeSelectorUstanovaLoading);
    this.error$ = this.store.select(pomocnoOsobljeSelectorUstanovaError);
    this.pomocnoosoblje$ = this.store.select(pomocnoOsobljeSelectorUstanova);
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ime: new FormControl('', Validators.required),
      prezime: new FormControl('', Validators.required),
      uloga: new FormControl('', Validators.required),
      brojtelefona: new FormControl('', Validators.required),
      radnomesto: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });

    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      console.log(id);
      this.store.dispatch(
        PomocnoOsobljeActions.getPomocnoOsobljeForUstanova({ id })
      );
    });
  }
  addPomocnoOsoblje() {
    this.route.params.subscribe(async (params) => {
      if (this.form.valid) {
        const info = this.form.value;
        const id = params['id']; // Assuming you get the ID from route params

        console.log('Doktor Info:', info);

        try {
          await this.store.dispatch(
            PomocnoOsobljeActions.postPomocnoOsoblje({
              pomocnoosoblje: {
                brojtelefona: info.brojtelefona,
                email: info.email,
                ime: info.ime,
                uloga: info.uloga,
                prezime: info.prezime,
                radnomesto: info.radnomesto,
              },
              id: id,
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
