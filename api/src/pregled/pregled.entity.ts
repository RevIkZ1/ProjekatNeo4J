import { DateTime } from 'neo4j-driver';
import { Doktor } from 'src/doktor/doktor.entity';
import { Pacijent } from 'src/pacijent/pacijent/pacijent.entity';

export class Pregled {
  id: number;
  datumivreme: DateTime;
  tip: string;
  dijagnoza: string;
  preporuke: string;
  pacijentId: Pacijent;
  doktorId: Doktor;
}
export class PregledInput {
  datumivreme?: DateTime | null;
  tip?: string | null;
  dijagnoza?: string | null;
  preporuke?: string | null;
  pacijentId?: Pacijent | null;
  doktorId?: Doktor | null;
}
