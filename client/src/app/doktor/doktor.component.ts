import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DoktorModel } from '../store/types/doktor.module';
import { Observable, finalize, map } from 'rxjs';
import { Pacijent, PacijentModel } from '../store/types/pacijent.module';
import { Store, select } from '@ngrx/store';
import { DoktorState } from '../store/types/doktor.interface';
import { ActivatedRoute } from '@angular/router';
import { PacijentState } from '../store/types/pacijent.interface';
import { DoktorService } from '../services/doktor.service';
import { PacijentService } from '../services/pacijent.service';
import {
  doktorSelector,
  doktorSelectorUstanova,
  doktorSelectorUstanovaError,
  doktorSelectorUstanovaLoading,
} from '../store/selectors/doktor.selector';
import {
  pacijentSelector,
  pacijentSelectorUstanova,
} from '../store/selectors/pacijent.selector';
import { selectAdminFeature } from '../store/selectors/admin.selector';
import * as DoktorActions from '../store/actions/doktor.actions';
import * as PacijentActions from '../store/actions/pacijent.actions';
import * as PregledActions from '../store/actions/pregled.actions';
import * as ReceptActions from '../store/actions/recept.actions';

import { Pregled } from '../store/types/pregled.module';
import { pregledSelectorUstanova } from '../store/selectors/pregled.selector';
import { PregledState } from '../store/types/pregled.interface';
import { ReceptService } from '../services/recept.service';

@Component({
  selector: 'app-doktor',
  templateUrl: './doktor.component.html',
  styleUrls: ['./doktor.component.css'],
})
export class DoktorComponent implements OnInit {
  form!: FormGroup;
  form1!: FormGroup;

  isLoading$?: Observable<boolean>;
  error$?: Observable<String | null>;
  doktor$?: Observable<DoktorModel | null>;
  pacijent$?: Observable<Pacijent | null>;
  pacijenti1$: Observable<PacijentModel[]>; // Dodajte $ oznaku
  isLoggedIn!: boolean;
  authenticated = true;
  pregled$?: Observable<Pregled[]> | undefined;
  selectedPregledId: number | null = null;
  selectedPacijent: PacijentModel | null = null;
  constructor(
    private store: Store<DoktorState>,
    private store1: Store<PregledState>,
    private store2: Store<PacijentState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private doktorService: DoktorService,
    private pacijentService: PacijentService,
    private receptService: ReceptService
  ) {
    this.isLoading$ = this.store.select(doktorSelectorUstanovaLoading);
    this.error$ = this.store.select(doktorSelectorUstanovaError);
    this.doktor$ = this.store.select(doktorSelector);
    this.pacijent$ = this.store.select(pacijentSelector);
    this.pacijenti1$ = this.store.select(pacijentSelectorUstanova); // Postavite vrednost

    this.pregled$ = this.store.select(pregledSelectorUstanova);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ime: new FormControl('', Validators.required),
      prezime: new FormControl('', Validators.required),
      specijalizacija: new FormControl('', Validators.required),
      brojtelefona: new FormControl('', Validators.required),
      ordinacija: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
    this.form1 = this.formBuilder.group({
      datumivremeizdavanja: new FormControl('', Validators.required),
      dnevnadoza: new FormControl('', Validators.required),
      nazivleka: new FormControl('', Validators.required),
      kakouzimati: new FormControl('', Validators.required),
    });
    this.store.pipe(select(selectAdminFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });

    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      console.log(id);
      this.store.dispatch(DoktorActions.getDoktor({ id }));
      this.store1.dispatch(PregledActions.getPregledForUstanova({ id }));
      if (this.pregled$) {
        this.pregled$.subscribe((pregledi) => {
          if (pregledi && pregledi.length > 0) {
            for (const pregled of pregledi) {
              if (pregled && pregled.id) {
                console.log(pregled.id);
                this.prikaziPacijente(pregled.id);
              }
            }
          }
        });
      }
    });
    if (this.doktor$ != undefined)
      this.doktor$.subscribe((doktor) => {
        // Update form controls with the values emitted by doktor$
        if (doktor) {
          this.form.patchValue({
            ime: doktor.ime,
            prezime: doktor.prezime,
            specijalizacija: doktor.specijalizacija,
            brojtelefona: doktor.brojtelefona,
            ordinacija: doktor.ordinacija,
            email: doktor.email,
          });
        }
      });
  }

  postRecept(id1: number | undefined) {
    this.route.params.subscribe(async (params) => {
      if (this.form1.valid) {
        const info = this.form1.value;
        const id = params['id']; // Assuming you get the ID from route params

        console.log('Doktor Info:', info);

        try {
          await this.store.dispatch(
            ReceptActions.postRecept({
              recept: {
                datumivremeizdavanja: info.datumivremeizdavanja,
                dnevnadoza: info.dnevnadoza,
                nazivleka: info.nazivleka,
                kakouzimati: info.kakouzimati,
              },
              id: id,
              id1: id1 || 0, // Assuming a default value of 0 if id1 is undefined
            })
          );

          this.form1.reset();
        } catch (error) {
          console.error('Error while posting Recept:', error);
          // Handle error appropriately (e.g., show a user-friendly message)
        }
      } else {
        alert('Molimo Vas popunite sva polja.');
      }
    });
  }
  putDoktor() {
    this.route.params.subscribe(async (params) => {
      if (this.form.valid) {
        const info = this.form.value;
        const id = params['id']; // Assuming you get the ID from route params

        console.log('Doktor Info:', info);

        try {
          await this.store.dispatch(
            DoktorActions.putDoktor({
              doktor: {
                brojtelefona: info.brojtelefona,
                email: info.email,
                ime: info.ime,
                ordinacija: info.ordinacija,
                prezime: info.prezime,
                specijalizacija: info.specijalizacija,
              },
              id: id,
            })
          );

          this.form.reset();
        } catch (error) {
          console.error('Error while updating Doktor:', error);
          // Handle error appropriately (e.g., show a user-friendly message)
        }
      } else {
      }
    });
  }

  delete(id: number) {
    if (confirm('Da li zaista zelite da obrisete pregled')) {
      this.store2.dispatch(PregledActions.deletePregled({ id }));
    }
  }
  prikaziPacijente(id: number) {
    this.store2.dispatch(PacijentActions.getPacijent({ id }));

    this.pacijentService
      .getPacijentByPregled(id)
      .subscribe((pacijent: PacijentModel) => {
        this.pacijenti1$ = this.pacijenti1$.pipe(
          map((pacijenti: PacijentModel[]) => [...pacijenti, pacijent])
        );
      });
  }
  prikaziPacijenta(pregledId: number) {
    this.selectedPregledId = pregledId;
    this.store2.dispatch(PacijentActions.getPacijent({ id: pregledId }));

    this.pacijentService
      .getPacijentByPregled(pregledId)
      .subscribe((pacijent: PacijentModel) => {
        this.selectedPacijent = pacijent;
      });
  }
  zatvoriPacijenta() {
    this.selectedPregledId = null;
    this.selectedPacijent = null;
  }
  prikazi() {
    console.log('Nista');
  }
}
