import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { ZdravstvenaUstanovaModel } from '../store/types/zdravstvenaustanova.module';

@Injectable({
  providedIn: 'root',
})
export class ZdravstenaUstanovaService {
  private idUstanoveSubject = new BehaviorSubject<number | null>(null);
  idUstanove$ = this.idUstanoveSubject.asObservable();
  setIdUstanove(id: number): void {
    this.idUstanoveSubject.next(id);
  }
  constructor(private http: HttpClient, private router: Router) {}

  getAllZdravstvenaUstanova(): Observable<ZdravstvenaUstanovaModel[]> {
    return this.http.get<ZdravstvenaUstanovaModel[]>(
      'http://localhost:3000/zdravstvenaustanova/getAll',
      { withCredentials: true }
    );
  }
  getAllZdravstvenaUstanovaId(
    id: number
  ): Observable<ZdravstvenaUstanovaModel> {
    const nesto = this.http.get<ZdravstvenaUstanovaModel>(
      `http://localhost:3000/zdravstvenaustanova/getustanova/${id}`,
      { withCredentials: true }
    );
    return nesto;
  }
}
