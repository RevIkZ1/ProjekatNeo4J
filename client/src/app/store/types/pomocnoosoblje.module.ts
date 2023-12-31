import { ZdravstvenaUstanova } from './zdravstvenaustanova.module';

export interface PomocnoOsoblje {
  id?: number;
  ime?: string;
  prezime?: string;
  uloga?: string;
  brojtelefona?: string;
  radnomesto?: string;
  email?: string;
  zdravstvenaUstanovaId?: ZdravstvenaUstanova;
}
export class PomocnoOsobljeModel implements PomocnoOsoblje {
  id?: number;
  ime?: string;
  prezime?: string;
  uloga?: string;
  brojtelefona?: string;
  radnomesto?: string;
  email?: string;
  zdravstvenaUstanovaId?: ZdravstvenaUstanova;

  constructor(
    id?: number,
    ime?: string,
    prezime?: string,
    uloga?: string,
    brojtelefona?: string,
    radnomesto?: string,
    email?: string,
    zdravstvenaUstanovaId?: ZdravstvenaUstanova
  ) {
    this.id = id;
    this.ime = ime;
    this.prezime = prezime;
    this.uloga = uloga;
    this.brojtelefona = brojtelefona;
    this.radnomesto = radnomesto;
    this.email = email;
    this.zdravstvenaUstanovaId = zdravstvenaUstanovaId;
  }
}
