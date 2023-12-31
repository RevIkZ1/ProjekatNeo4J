import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Lek, LekModel } from '../store/types/lek.module';

@Injectable({
  providedIn: 'root',
})
export class LekService {
  constructor(private http: HttpClient, private router: Router) {}
  putLek(lek: LekModel, id: number): Observable<Lek[]> {
    console.log(id);

    const lekData = {
      naziv: lek.naziv,
      kolicina: lek.kolicina,
      id: +id,
    };

    console.log('11111111111');
    console.log(lekData);
    console.log('11111111111');

    const a = this.http.put<Lek[]>(
      `http://localhost:3000/lekovi/uzmiLek`,
      lekData,
      {
        withCredentials: true,
      }
    );
    a.subscribe(
      (data) => console.log('Success:', data),
      (error) => console.error('Error:', error)
    );

    console.log('LJUBAV', a, 'LJUBAV');
    return a;
  }
  getLekForUstanova(id: number): Observable<LekModel[]> {
    console.log(id);
    const nesto = this.http.get<LekModel[]>(
      `http://localhost:3000/lekovi/getlekbyustanova/${id}`,
      { withCredentials: true }
    );
    console.log(nesto);
    return nesto;
  }
  postDoktor(lek: LekModel, id: number): Observable<Lek[]> {
    console.log(id);

    const lekData = {
      naziv: lek.naziv,
      kolicina: lek.kolicina,
      zdravstvenaUstanovaId: +id, // Explicitly cast to number
    };

    return this.http.post<Lek[]>(
      `http://localhost:3000/lekovi/addLek`,
      lekData,
      {
        withCredentials: true,
      }
    );
  }
}
