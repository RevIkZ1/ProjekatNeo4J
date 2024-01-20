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
import { Store, select } from '@ngrx/store';
import {
  lekSelector,
  lekSelectorUstanova,
  lekSelectorUstanovaError,
  lekSelectorUstanovaLoading,
} from '../store/selectors/lek.selector';
import * as LekActions from '../store/actions/lek.actions';
import { LekService } from '../services/lek.service';
import { selectAdminFeature } from '../store/selectors/admin.selector';

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
  leksPerPage = 10; // Number of leks to display per page
  currentPage = 1; // Current page
  totalLeks = 0; // Total number of leks

  get totalPages(): number {
    return Math.ceil(this.totalLeks / this.leksPerPage);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.leksPerPage;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.leksPerPage, this.totalLeks);
  }
  ngOnInit(): void {
    this.store.pipe(select(selectAdminFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });
    this.form = this.formBuilder.group({
      naziv: new FormControl('', Validators.required),
      kolicina: new FormControl('', Validators.required),
    });

    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      console.log(id);
      this.store.dispatch(LekActions.getLekoviForUstanova({ id }));
    });
    if (this.lek$ != undefined)
      this.lek$.subscribe((leks) => (this.totalLeks = leks.length));
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
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
