import { ZdravstvenaUstanova } from './zdravstvenaustanova.module';

export interface Pacijent {
  id?: number;
  ime?: string;
  prezime?: string;
  datumrodjenja?: Date;
  brojtelefona?: string;
  brosiguranja?: string;
  alergije?: string;
  zdravstvenaUstanovaId?: ZdravstvenaUstanova;
}
export class PacijentModel implements Pacijent {
  id?: number;
  ime?: string;
  prezime?: string;
  datumrodjenja?: Date;
  brojtelefona?: string;
  brosiguranja?: string;
  alergije?: string;
  zdravstvenaUstanovaId?: ZdravstvenaUstanova;

  constructor(
    id?: number,
    ime?: string,
    prezime?: string,
    datumrodjenja?: Date,
    brojtelefona?: string,
    brosiguranja?: string,
    alergije?: string,
    zdravstvenaUstanovaId?: ZdravstvenaUstanova
  ) {
    this.id = id;
    this.ime = ime;
    this.prezime = prezime;
    this.datumrodjenja = datumrodjenja;
    this.brojtelefona = brojtelefona;
    this.brosiguranja = brosiguranja;
    this.alergije = alergije;
    this.zdravstvenaUstanovaId = zdravstvenaUstanovaId;
  }
}
