import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Doktor, DoktorModel } from '../store/types/doktor.module';

@Injectable({
  providedIn: 'root',
})
export class DoktorService {
  constructor(private http: HttpClient, private router: Router) {}

  getDoktorForUstanova(id: number): Observable<DoktorModel[]> {
    const nesto = this.http.get<DoktorModel[]>(
      `http://localhost:3000/doktori/getdoktoribyustanova/${id}`,
      { withCredentials: true }
    );
    return nesto;
  }
  postDoktor(doktor: DoktorModel, id: number): Observable<Doktor[]> {
    const doktorData = {
      brojtelefona: doktor.brojtelefona,
      email: doktor.email,
      ime: doktor.ime,
      ordinacija: doktor.ordinacija,
      prezime: doktor.prezime,
      specijalizacija: doktor.specijalizacija,
      zdravstvenaUstanovaId: +id, // Explicitly cast to number
    };

    return this.http.post<Doktor[]>(
      `http://localhost:3000/doktori/addDoktor`,
      doktorData,
      {
        withCredentials: true,
      }
    );
  }
  putDoktor(doktor: DoktorModel, id: number): Observable<Doktor[]> {
    const doktorData = {
      brojtelefona: doktor.brojtelefona,
      email: doktor.email,
      ime: doktor.ime,
      ordinacija: doktor.ordinacija,
      prezime: doktor.prezime,
      specijalizacija: doktor.specijalizacija,
    };

    return this.http.put<Doktor[]>(
      `http://localhost:3000/doktori/updateDoktor/${id}`,
      doktorData,
      {
        withCredentials: true,
      }
    );
  }
  getDoktorById(id: number): Observable<DoktorModel> {
    const nesto = this.http.get<DoktorModel>(
      `http://localhost:3000/doktori/getdoktor/${id}`,
      { withCredentials: true }
    );
    return nesto;
  }
  deleteDoktor(id: number) {
    return this.http.delete<number>(
      `http://localhost:3000/doktori/deleteDoktor/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
