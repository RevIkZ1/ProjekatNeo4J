import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, catchError, finalize, of, switchMap } from 'rxjs';
import { PregledService } from '../services/pregled.service';
import { ReceptService } from '../services/recept.service';
import { PacijentService } from '../services/pacijent.service';
import { PregledState } from '../store/types/pregled.interface';
import { Store, select } from '@ngrx/store';
import { DoktorState } from '../store/types/doktor.interface';
import { PacijentState } from '../store/types/pacijent.interface';
import { ActivatedRoute } from '@angular/router';
import { DoktorService } from '../services/doktor.service';
import {
  pacijentSelector,
  pacijentSelectorUstanova,
  pacijentSelectorUstanovaError,
  pacijentSelectorUstanovaLoading,
} from '../store/selectors/pacijent.selector';
import { Doktor, DoktorModel } from '../store/types/doktor.module';
import { Pacijent, PacijentModel } from '../store/types/pacijent.module';
import { Pregled } from '../store/types/pregled.module';
import { Recept } from '../store/types/recept.module';
import {
  doktorSelector,
  doktorSelectorUstanova,
} from '../store/selectors/doktor.selector';
import { pregledSelectorUstanova } from '../store/selectors/pregled.selector';
import { receptSelectorUstanova } from '../store/selectors/recept.selector';
import * as PacijentActions from '../store/actions/pacijent.actions';
import * as DoktorActions from '../store/actions/doktor.actions';
import * as PregledActions from '../store/actions/pregled.actions';
import * as ReceptActions from '../store/actions/recept.actions';
import * as LekActions from '../store/actions/lek.actions';

import { ZdravstenaUstanovaService } from '../services/zdravstvenaUstanova.service';
import { ReceptState } from '../store/types/recept.inrerface';
import { LekService } from '../services/lek.service';
import { selectAdminFeature } from '../store/selectors/admin.selector';

@Component({
  selector: 'app-pacijentt',
  templateUrl: './pacijentt.component.html',
  styleUrls: ['./pacijentt.component.css'],
})
export class PacijenttComponent implements OnInit {
  form!: FormGroup;
  form1!: FormGroup;

  isLoading$?: Observable<boolean>;
  error$?: Observable<String | null>;
  doktori$?: Observable<Doktor[]>;
  pacijent$?: Observable<Pacijent | null>;
  isLoggedIn!: boolean;
  authenticated = true;
  pregled$?: Observable<Pregled[]> | undefined;
  recept$?: Observable<Recept[]> | undefined;
  constructor(
    private store: Store<DoktorState>,
    private store1: Store<PregledState>,
    private store2: Store<PacijentState>,
    private store3: Store<ReceptState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private doktorService: DoktorService,
    private pacijentService: PacijentService,
    private lekService: LekService,
    private receptService: ReceptService,
    private pregledService: PregledService,
    private zdravstvenaService: ZdravstenaUstanovaService
  ) {
    this.isLoading$ = this.store.select(pacijentSelectorUstanovaLoading);
    this.error$ = this.store.select(pacijentSelectorUstanovaError);
    this.doktori$ = this.store.select(doktorSelectorUstanova);
    this.pacijent$ = this.store2.select(pacijentSelector);
    this.recept$ = this.store.select(receptSelectorUstanova);
    this.pregled$ = this.store.select(pregledSelectorUstanova);
  }
  ngOnInit(): void {
    this.store.pipe(select(selectAdminFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });
    this.form = this.formBuilder.group({
      ime: new FormControl('', Validators.required),
      prezime: new FormControl('', Validators.required),
      brosiguranja: new FormControl('', Validators.required),
      brojtelefona: new FormControl('', Validators.required),
      datumrodjenja: new FormControl('', Validators.required),
      alergije: new FormControl('', Validators.required),
    });
    this.form1 = this.formBuilder.group({
      datumivreme: new FormControl('', Validators.required),
      tip: new FormControl('', Validators.required),
      dijagnoza: new FormControl('', Validators.required),
      preporuke: new FormControl('', Validators.required),
    });

    this.route.params.subscribe(async (params) => {
      let id = params['id'];
      this.store3.dispatch(ReceptActions.getReceptForUstanova({ id }));
      this.store2.dispatch(PacijentActions.getOnePacijent({ id }));
      id = params['ZdravstvenaID'];

      this.store.dispatch(DoktorActions.getDoktoriForUstanova({ id: id }));
    });
  }
  postPregled(id1: number | undefined) {
    this.route.params.subscribe(async (params) => {
      if (this.form1.valid) {
        const info = this.form1.value;
        const id = params['id']; // Assuming you get the ID from route params
        if (id1 != undefined)
          this.receptService
            .postDoktor(info, id, id1)
            .pipe(
              finalize(() => {
                this.store.dispatch(
                  PregledActions.postPregled({
                    pregled: {
                      datumivreme: info.datumivreme,
                      tip: info.tip,
                      dijagnoza: info.dijagnoza,
                      preporuke: info.preporuke,
                    },
                    id: id,
                    id1: id1,
                  })
                );
                this.form1.reset();
              })
            )
            .subscribe();
      } else {
        alert('Molimo Vas popunite sva polja.');
      }
    });
  }
  putPacijent() {
    try {
      this.route.params.subscribe(async (params) => {
        if (this.form.valid) {
          const info = this.form.value;
          const id = params['id']; // Assuming you get the ID from route params

          this.store.dispatch(
            PacijentActions.putPacijent({
              pacijent: {
                brojtelefona: info.brojtelefona,
                datumrodjenja: info.datumrodjenja,
                ime: info.ime,
                brosiguranja: info.brosiguranja,
                prezime: info.prezime,
                alergije: info.alergije,
              },
              id: id,
            })
          );

          this.form.reset();
        }
      });
    } catch (error) {
      console.error('Greška prilikom ažuriranja pacijenta:', error);
      alert('Došlo je do greške prilikom ažuriranja pacijenta.');
    }
  }
  uzmiLek(
    naziv: string | undefined,
    kolicina: number | undefined,
    id1: number | undefined
  ) {
    this.route.params
      .pipe(
        switchMap(async (params) => {
          const info = { naziv, kolicina };
          const id = params['ZdravstvenaID'];

          this.store.dispatch(
            LekActions.putLek({
              lek: {
                naziv: info.naziv,
                kolicina: info.kolicina,
              },
              id: id,
              id1: id1,
            })
          );

          return id;
        }),
        catchError((error) => {
          alert('Lek ne postoji u ovoj ustanovi');
          return of(null);
        })
      )
      .subscribe((id) => {});
  }
}
