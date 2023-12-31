import { ZdravstvenaUstanova } from './zdravstvenaustanova.module';

export interface Lek {
  id?: number;
  naziv?: string;
  kolicina?: number;
  zdravstvenaUstanovaId?: ZdravstvenaUstanova;
}
export class LekModel implements Lek {
  id?: number;
  naziv?: string;
  kolicina?: number;
  zdravstvenaUstanovaId?: ZdravstvenaUstanova;

  constructor(
    id?: number,
    naziv?: string,
    kolicina?: number,
    zdravstvenaUstanovaId?: ZdravstvenaUstanova
  ) {
    this.id = id;
    this.naziv = naziv;
    this.kolicina = kolicina;

    this.zdravstvenaUstanovaId = zdravstvenaUstanovaId;
  }
}
