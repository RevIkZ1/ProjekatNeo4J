import { ZdravstvenaUstanova } from './zdravstvenaustanova.module';

export interface Doktor {
  id?: number;
  ime?: string;
  prezime?: string;
  specijalizacija?: string;
  brojtelefona?: string;
  ordinacija?: string;
  email?: string;
  zdravstvenaUstanovaId?: ZdravstvenaUstanova;
}
export class DoktorModel implements Doktor {
  id?: number;
  ime?: string;
  prezime?: string;
  specijalizacija?: string;
  brojtelefona?: string;
  ordinacija?: string;
  email?: string;
  zdravstvenaUstanovaId?: ZdravstvenaUstanova;

  constructor(
    id?: number,
    ime?: string,
    prezime?: string,
    specijalizacija?: string,
    brojtelefona?: string,
    ordinacija?: string,
    email?: string,
    zdravstvenaUstanovaId?: ZdravstvenaUstanova
  ) {
    this.id = id;
    this.ime = ime;
    this.prezime = prezime;
    this.specijalizacija = specijalizacija;
    this.brojtelefona = brojtelefona;
    this.ordinacija = ordinacija;
    this.email = email;
    this.zdravstvenaUstanovaId = zdravstvenaUstanovaId;
  }
}
