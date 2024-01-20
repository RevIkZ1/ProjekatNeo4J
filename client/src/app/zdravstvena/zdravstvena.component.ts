import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, finalize } from 'rxjs';
import { ZdravstvenaUstanovaModel } from '../store/types/zdravstvenaustanova.module';
import { ActivatedRoute } from '@angular/router';
import { ZdravstvenaUstanovaState } from '../store/types/zdravstvenaustanova.interface';
import { Store, select } from '@ngrx/store';
import {
  ZdravstvenaUstanovaSelector,
  isLoadingZdravstvenaUstanova,
  stateZdravstvenaUstanovaSelector,
  zdravstvenaSelector,
} from '../store/selectors/zdravstvenaustanova.selector';
import * as ZdravstvenaUstanovaAcions from '../store/actions/zdravstvenaustanova.actions';
import { Doktor, DoktorModel } from '../store/types/doktor.module';
import { DoktorState } from '../store/types/doktor.interface';
import { doktorSelectorUstanova } from '../store/selectors/doktor.selector';
import * as DoktorActions from '../store/actions/doktor.actions';
import * as PacijentActions from '../store/actions/pacijent.actions';

import { PacijentState } from '../store/types/pacijent.interface';
import { Pacijent } from '../store/types/pacijent.module';
import { pacijentSelectorUstanova } from '../store/selectors/pacijent.selector';
import { DoktorService } from '../services/doktor.service';
import { PacijentService } from '../services/pacijent.service';
import { selectAdminFeature } from '../store/selectors/admin.selector';
import { ZdravstenaUstanovaService } from '../services/zdravstvenaUstanova.service';

@Component({
  selector: 'app-zdravstvena',
  templateUrl: './zdravstvena.component.html',
  styleUrls: ['./zdravstvena.component.css'],
})
export class ZdravstvenaComponent implements OnInit {
  form!: FormGroup;
  form1!: FormGroup;

  isLoading$?: Observable<boolean>;
  error$?: Observable<String | null>;
  zdravstvenaustanova$: Observable<ZdravstvenaUstanovaModel | null>;
  doktor$?: Observable<Doktor[]>;
  pacijent$?: Observable<Pacijent[]>;
  isLoggedIn!: boolean;
  authenticated = true;

  constructor(
    private store: Store<ZdravstvenaUstanovaState>,
    private store1: Store<DoktorState>,
    private store2: Store<PacijentState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private doktorService: DoktorService,
    private pacijentService: PacijentService,
    private zdravstvenaService: ZdravstenaUstanovaService
  ) {
    this.isLoading$ = this.store.select(isLoadingZdravstvenaUstanova);
    this.error$ = this.store.select(stateZdravstvenaUstanovaSelector);
    this.zdravstvenaustanova$ = this.store.select(zdravstvenaSelector);
    this.doktor$ = this.store.select(doktorSelectorUstanova);
    this.pacijent$ = this.store.select(pacijentSelectorUstanova);
  }
  currentPageDoktor = 1; // Current page for doctors
  totalDoktor = 0; // Total number of doctors

  get totalPagesDoktor(): number {
    return Math.ceil(this.totalDoktor / 4); // Assuming 4 doctors per page
  }

  get startIndexDoktor(): number {
    return (this.currentPageDoktor - 1) * 4; // Assuming 4 doctors per page
  }

  get endIndexDoktor(): number {
    return Math.min(this.startIndexDoktor + 4, this.totalDoktor); // Assuming 4 doctors per page
  }
  currentPagePacijent = 1; // Current page for pacijenti
  totalPacijent = 0; // Total number of pacijenti

  get totalPagesPacijent(): number {
    return Math.ceil(this.totalPacijent / 4); // Assuming 4 pacijenti per page
  }

  get startIndexPacijent(): number {
    return (this.currentPagePacijent - 1) * 4; // Assuming 4 pacijenti per page
  }

  get endIndexPacijent(): number {
    return Math.min(this.startIndexPacijent + 4, this.totalPacijent); // Assuming 4 pacijenti per page
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
      ime1: new FormControl('', Validators.required),
      prezime1: new FormControl('', Validators.required),
      datumrodjenja1: new FormControl('', Validators.required),
      brojtelefona1: new FormControl('', Validators.required),
      brosiguranja1: new FormControl('', Validators.required),
      alergije1: new FormControl('', Validators.required),
    });

    this.store.pipe(select(selectAdminFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });

    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      this.zdravstvenaService.setIdUstanove(id);
      this.store.dispatch(ZdravstvenaUstanovaAcions.getZdravstvena({ id }));
      this.store1.dispatch(DoktorActions.getDoktoriForUstanova({ id }));
      this.store2.dispatch(PacijentActions.getPacijentiForUstanova({ id }));
    });
    if (this.doktor$ != undefined)
      this.doktor$.subscribe((doktori) => (this.totalDoktor = doktori.length));
    if (this.pacijent$ != undefined)
      this.pacijent$.subscribe(
        (pacijenti) => (this.totalPacijent = pacijenti.length)
      );
  }
  prevPageDoktor() {
    if (this.currentPageDoktor > 1) {
      this.currentPageDoktor--;
    }
  }

  nextPageDoktor() {
    if (this.currentPageDoktor < this.totalPagesDoktor) {
      this.currentPageDoktor++;
    }
  }

  prevPagePacijent() {
    if (this.currentPagePacijent > 1) {
      this.currentPagePacijent--;
    }
  }

  nextPagePacijent() {
    if (this.currentPagePacijent < this.totalPagesPacijent) {
      this.currentPagePacijent++;
    }
  }

  addDoktor() {
    this.route.params.subscribe(async (params) => {
      if (this.form.valid) {
        const info = this.form.value;
        const id = params['id']; // Assuming you get the ID from route params

        console.log('Doktor Info:', info);

        try {
          await this.store1.dispatch(
            DoktorActions.postDoktor({
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
          console.error('Error while posting Doktor:', error);
        }
      } else {
        alert('Molimo Vas popunite sva polja.');
      }
    });
  }

  addPacijent() {
    this.route.params.subscribe(async (params) => {
      if (this.form1.valid) {
        const info1 = this.form1.value;

        const id = params['id']; // Assuming you get the ID from route params
        console.log('Pacijent Info:', info1);

        this.pacijentService
          .postPacijent(info1, id)
          .pipe(
            finalize(async () => {
              this.store2.dispatch(
                PacijentActions.postPacijent({
                  pacijent: {
                    brojtelefona: info1.brojtelefona1,
                    datumrodjenja: info1.datumrodjenja1,
                    ime: info1.ime1,
                    brosiguranja: info1.brosiguranja1,
                    prezime: info1.prezime1,
                    alergije: info1.alergije1,
                  },
                  id: id,
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

  prikazi() {
    this.zdravstvenaustanova$?.subscribe((res) => {
      console.log(res);
    });
  }
  delete(id: number) {
    if (confirm('Da li zaista zelite da obrisete pacijenta')) {
      this.store2.dispatch(PacijentActions.deletePacijent({ id }));
    }
  }
  delete1(id: number) {
    if (confirm('Da li zaista zelite da obrisete doktora')) {
      this.store2.dispatch(DoktorActions.deleteDoktor({ id }));
    }
  }
}
