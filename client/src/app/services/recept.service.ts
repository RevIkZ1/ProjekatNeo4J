import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Doktor, DoktorModel } from '../store/types/doktor.module';
import { Recept, ReceptModel } from '../store/types/recept.module';

@Injectable({
  providedIn: 'root',
})
export class ReceptService {
  constructor(private http: HttpClient, private router: Router) {}

  postDoktor(
    recept: ReceptModel,
    id: number,
    id1: number
  ): Observable<Recept[]> {
    console.log(id);

    console.log(id);

    const formattedDatumivreme = recept.datumivremeizdavanja + ':00';

    const doktorData = {
      datumivremeizdavanja: formattedDatumivreme,
      dnevnadoza: recept.dnevnadoza,
      nazivleka: recept.nazivleka,
      kakouzimati: recept.kakouzimati,
      pacijentId: +id1,
      doktorId: +id,
    };

    return this.http.post<Recept[]>(
      `http://localhost:3000/recept/addRecept`,
      doktorData,
      {
        withCredentials: true,
      }
    );
  }
  getReceptForPacijent(id: number): Observable<ReceptModel[]> {
    console.log('POSALJI');
    console.log(id);
    console.log('POSALJI');

    const nesto = this.http.get<ReceptModel[]>(
      `http://localhost:3000/recept/getRecepti/${id}`,
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
  deleteRecept(id: number) {
    return this.http.delete<number>(
      `http://localhost:3000/recept/deleteRecept/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
