import { Doktor } from './doktor.module';
import { Pacijent } from './pacijent.module';
import { ZdravstvenaUstanova } from './zdravstvenaustanova.module';

export interface Recept {
  id?: number;
  datumivremeizdavanja?: Date;
  dnevnadoza?: number;
  nazivleka?: string;
  kakouzimati?: string;
  pacijentId?: Pacijent;
  doktorId?: Doktor;
}
export class ReceptModel implements Recept {
  id?: number;
  datumivremeizdavanja?: Date;
  dnevnadoza?: number;
  nazivleka?: string;
  kakouzimati?: string;
  pacijentId?: Pacijent;
  doktorId?: Doktor;

  constructor(
    id?: number,
    datumivremeizdavanja?: Date,
    dnevnadoza?: number,
    nazivleka?: string,
    kakouzimati?: string,
    pacijentId?: Pacijent,
    doktorId?: Doktor
  ) {
    this.id = id;
    this.datumivremeizdavanja = datumivremeizdavanja;
    this.dnevnadoza = dnevnadoza;
    this.nazivleka = nazivleka;
    this.kakouzimati = kakouzimati;
    this.pacijentId = pacijentId;
    this.doktorId = doktorId;
  }
}
