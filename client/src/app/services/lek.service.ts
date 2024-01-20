import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { Lek, LekModel } from '../store/types/lek.module';

@Injectable({
  providedIn: 'root',
})
export class LekService {
  constructor(private http: HttpClient, private router: Router) {}
  putLek(
    lek: LekModel,
    id: number,
    id1: number | undefined
  ): Observable<Lek[]> {
    console.log(id);
    console.log(lek);
    const lekData = {
      naziv: lek.naziv,
      kolicina: lek.kolicina,
      id: +id,
    };

    return this.http
      .put<Lek[]>(`http://localhost:3000/lekovi/uzmiLek`, lekData, {
        withCredentials: true,
      })
      .pipe(
        tap((result) => {
          console.log('HTTP zahtev uspešan:', result);
        }),
        catchError((error) => {
          console.error('Greška prilikom HTTP zahteva:', error);

          const status = error.status;
          if (status === 404) {
            alert('Nema tog leka u ustanovi.');
          } else {
            alert('Došlo je do greške prilikom uzimanja leka.');
          }

          return throwError(error);
        }),
        switchMap((result) => {
          return this.deleteRecept(id1);
        })
      );
  }

  deleteRecept(id: number | undefined): Observable<Lek[]> {
    return this.http.delete<Lek[]>(
      `http://localhost:3000/recept/deleteRecept/${id}`,
      {
        withCredentials: true,
      }
    );
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
