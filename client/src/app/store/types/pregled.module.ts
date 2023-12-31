import { Doktor } from './doktor.module';
import { Pacijent } from './pacijent.module';
import { ZdravstvenaUstanova } from './zdravstvenaustanova.module';

export interface Pregled {
  id?: number;
  datumivreme?: Date;
  tip?: string;
  dijagnoza?: string;
  preporuke?: string;
  pacijentId?: Pacijent;
  doktorId?: Doktor;
}
export class PregledModel implements Pregled {
  id?: number;
  datumivreme?: Date;
  tip?: string;
  dijagnoza?: string;
  preporuke?: string;
  pacijentId?: Pacijent;
  doktorId?: Doktor;

  constructor(
    id?: number,
    datumivreme?: Date,
    tip?: string,
    dijagnoza?: string,
    preporuke?: string,
    pacijentId?: Pacijent,
    doktorId?: Doktor
  ) {
    this.id = id;
    this.datumivreme = datumivreme;
    this.tip = tip;
    this.dijagnoza = dijagnoza;
    this.preporuke = preporuke;
    this.pacijentId = pacijentId;
    this.doktorId = doktorId;
  }
}
