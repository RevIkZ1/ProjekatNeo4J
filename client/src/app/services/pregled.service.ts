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
    console.log('POSALJI');
    console.log(id);
    console.log('POSALJI');

    const nesto = this.http.get<PregledModel[]>(
      `http://localhost:3000/pregled/getPregledi/${id}`,
      { withCredentials: true }
    );
    nesto.pipe(
      tap((response) => {
        console.log('MOLIM', response);
      })
    );
    console.log(nesto, 'MOLIM');
    return nesto;
  }
  deletePregled(id: number) {
    console.log(id);
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
    console.log(id);

    console.log(id);

    const formattedDatumivreme = pregled.datumivreme + ':00';

    const doktorData = {
      datumivreme: formattedDatumivreme,
      tip: pregled.tip,
      dijagnoza: pregled.dijagnoza,
      preporuke: pregled.preporuke,
      pacijentId: +id,
      doktorId: +id1,
    };
    console.log(doktorData, 'JEL DOBRO?');
    return this.http.post<Pregled[]>(
      `http://localhost:3000/pregled/addPregled`,
      doktorData,
      {
        withCredentials: true,
      }
    );
  }
}
