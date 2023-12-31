import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Lek, LekModel } from '../store/types/lek.module';
import {
  PomocnoOsoblje,
  PomocnoOsobljeModel,
} from '../store/types/pomocnoosoblje.module';

@Injectable({
  providedIn: 'root',
})
export class PomocnoOsobljeService {
  constructor(private http: HttpClient, private router: Router) {}

  getLekForUstanova(id: number): Observable<PomocnoOsobljeModel[]> {
    console.log(id);
    const nesto = this.http.get<PomocnoOsobljeModel[]>(
      `http://localhost:3000/pomocnoosoblje/getpomocnoosobljebyustanova/${id}`,
      { withCredentials: true }
    );
    console.log(nesto);
    return nesto;
  }
  postDoktor(
    pomocnoosoblje: PomocnoOsobljeModel,
    id: number
  ): Observable<PomocnoOsoblje[]> {
    console.log(id);

    const lekData = {
      ime: pomocnoosoblje.ime,
      prezime: pomocnoosoblje.prezime,
      uloga: pomocnoosoblje.uloga,
      brojtelefona: pomocnoosoblje.brojtelefona,
      radnomesto: pomocnoosoblje.radnomesto,
      email: pomocnoosoblje.email,
      zdravstvenaUstanovaId: +id,
    };

    return this.http.post<PomocnoOsoblje[]>(
      `http://localhost:3000/pomocnoosoblje/addOsoblje`,
      lekData,
      {
        withCredentials: true,
      }
    );
  }
}
