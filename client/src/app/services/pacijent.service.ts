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
    console.log(id);
    const nesto = this.http.get<PacijentModel[]>(
      `http://localhost:3000/pacijenti/getpacijentbyustanova/${id}`,
      { withCredentials: true }
    );
    console.log(nesto);
    return nesto;
  }
  postPacijent(pacijent: PacijentModel, id: number): Observable<Pacijent[]> {
    console.log('PERICAAA', pacijent); // Promenjeno mesto za konzolni ispis

    const pacijentData = {
      brojtelefona: pacijent.brojtelefona,
      brosiguranja: pacijent.brosiguranja,
      ime: pacijent.ime,
      alergije: pacijent.alergije,
      prezime: pacijent.prezime,
      datumrodjenja: pacijent.datumrodjenja,
      zdravstvenaUstanovaId: +id, // Explicitly cast to number
    };

    console.log('PERICAAA', pacijentData); // Promenjeno mesto za konzolni ispis

    return this.http.post<Pacijent[]>(
      `http://localhost:3000/pacijenti/addPacijent`,
      pacijentData,
      {
        withCredentials: true,
      }
    );
  }
  deletePacijent(id: number) {
    console.log(id);
    return this.http.delete<number>(
      `http://localhost:3000/pacijenti/deletePacijent/${id}`,
      {
        withCredentials: true,
      }
    );
  }
  getPacijentByRecept(id: number): Observable<PacijentModel> {
    console.log(id);
    const nesto = this.http.get<PacijentModel>(
      `http://localhost:3000/pacijenti/getPacijentByPregledId/${id}`,
      { withCredentials: true }
    );

    nesto.subscribe(
      (data) => {
        console.log('Vrednost dobijena iz HTTP zahteva:', data);
      },
      (error) => {
        console.error('Greška prilikom izvršavanja HTTP zahteva:', error);
      }
    );

    return nesto;
  }
  getOnePacijent(id: number): Observable<PacijentModel> {
    console.log(id);
    const nesto = this.http.get<PacijentModel>(
      `http://localhost:3000/pacijenti/getpacijent/${id}`,
      { withCredentials: true }
    );

    nesto.subscribe(
      (data) => {
        console.log('Vrednost dobijena iz HTTP zahteva:', data);
      },
      (error) => {
        console.error('Greška prilikom izvršavanja HTTP zahteva:', error);
      }
    );

    return nesto;
  }
  putDoktor(pacijent: PacijentModel, id: number): Observable<Pacijent[]> {
    console.log(id);

    const pacijentData = {
      brojtelefona: pacijent.brojtelefona,
      datumrodjenja: pacijent.datumrodjenja,
      ime: pacijent.ime,
      brosiguranja: pacijent.brosiguranja,
      prezime: pacijent.prezime,
      alergije: pacijent.alergije,
    };

    console.log('11111111111');
    console.log(pacijentData);
    console.log('11111111111');

    return this.http.put<Pacijent[]>(
      `http://localhost:3000/pacijenti/updateDoktor/${id}`,
      pacijentData,
      {
        withCredentials: true,
      }
    );
  }
}
