import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Doktor, DoktorModel } from '../store/types/doktor.module';
import { Pregled, PregledModel } from '../store/types/pregled.module';

@Injectable({
  providedIn: 'root',
})
export class PregledService {
  constructor(private http: HttpClient, private router: Router) {}

  getPregledForDoktor(id: number): Observable<PregledModel[]> {
    const nesto = this.http.get<PregledModel[]>(
      `http://localhost:3000/pregled/getPregledi/${id}`,
      { withCredentials: true }
    );
    nesto.pipe(
      tap((response) => {
        console.log('', response);
      })
    );
    return nesto;
  }
  deletePregled(id: number) {
    return this.http.delete<number>(
      `http://localhost:3000/pregled/deletePregled/${id}`,
      {
        withCredentials: true,
      }
    );
  }
  postPregled(
    pregled: PregledModel,
    id: number,
    id1: number
  ): Observable<Pregled[]> {
    const formattedDatumivreme = pregled.datumivreme + ':00';

    const doktorData = {
      datumivreme: formattedDatumivreme,
      tip: pregled.tip,
      dijagnoza: pregled.dijagnoza,
      preporuke: pregled.preporuke,
      pacijentId: +id,
      doktorId: +id1,
    };
    return this.http.post<Pregled[]>(
      `http://localhost:3000/pregled/addPregled`,
      doktorData,
      {
        withCredentials: true,
      }
    );
  }
}
