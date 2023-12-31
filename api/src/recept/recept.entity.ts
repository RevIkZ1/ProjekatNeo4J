import { DateTime } from 'neo4j-driver';
import { Doktor } from 'src/doktor/doktor.entity';
import { Pacijent } from 'src/pacijent/pacijent/pacijent.entity';

export class Recept {
  id: number;
  datumivremeizdavanja: DateTime;
  dnevnadoza: number;
  nazivleka: string;
  kakouzimati: string;
  pacijentId: Pacijent;
  doktorId: Doktor;
}
export class ReceptInput {
  datumivremeizdavanja?: DateTime | null;
  dnevnadoza?: number | null;
  nazivleka?: string | null;
  kakouzimati?: string | null;
  pacijentId?: Pacijent | null;
  doktorId?: Doktor | null;
}
