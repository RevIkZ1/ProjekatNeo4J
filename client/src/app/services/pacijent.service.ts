import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DoktorModel } from '../store/types/doktor.module';
import { Pacijent, PacijentModel } from '../store/types/pacijent.module';

@Injectable({
  providedIn: 'root',
})
export class PacijentService {
  constructor(private http: HttpClient, private router: Router) {}

  getPacijentForUstanova(id: number): Observable<PacijentModel[]> {
    const nesto = this.http.get<PacijentModel[]>(
      `http://localhost:3000/pacijenti/getpacijentbyustanova/${id}`,
      { withCredentials: true }
    );
    return nesto;
  }
  postPacijent(pacijent: PacijentModel, id: number): Observable<Pacijent[]> {
    const pacijentData = {
      brojtelefona: pacijent.brojtelefona,
      brosiguranja: pacijent.brosiguranja,
      ime: pacijent.ime,
      alergije: pacijent.alergije,
      prezime: pacijent.prezime,
      datumrodjenja: pacijent.datumrodjenja,
      zdravstvenaUstanovaId: +id, // Explicitly cast to number
    };

    return this.http.post<Pacijent[]>(
      `http://localhost:3000/pacijenti/addPacijent`,
      pacijentData,
      {
        withCredentials: true,
      }
    );
  }
  deletePacijent(id: number) {
    return this.http.delete<number>(
      `http://localhost:3000/pacijenti/deletePacijent/${id}`,
      {
        withCredentials: true,
      }
    );
  }
  getPacijentByPregled(id: number): Observable<PacijentModel> {
    const nesto = this.http.get<PacijentModel>(
      `http://localhost:3000/pacijenti/getPacijentByPregledId/${id}`,
      { withCredentials: true }
    );

    return nesto;
  }

  getOnePacijent(id: number): Observable<PacijentModel> {
    const nesto = this.http.get<PacijentModel>(
      `http://localhost:3000/pacijenti/getpacijent/${id}`,
      { withCredentials: true }
    );

    return nesto;
  }
  putDoktor(pacijent: PacijentModel, id: number): Observable<Pacijent[]> {
    const pacijentData = {
      brojtelefona: pacijent.brojtelefona,
      datumrodjenja: pacijent.datumrodjenja,
      ime: pacijent.ime,
      brosiguranja: pacijent.brosiguranja,
      prezime: pacijent.prezime,
      alergije: pacijent.alergije,
    };

    return this.http.put<Pacijent[]>(
      `http://localhost:3000/pacijenti/updateDoktor/${id}`,
      pacijentData,
      {
        withCredentials: true,
      }
    );
  }
}
