import { Doktor } from 'src/doktor/doktor.entity';
import { Pacijent } from 'src/pacijent/pacijent/pacijent.entity';
import { Pomocnoosoblje } from 'src/pomocnoosoblje/pomocnoosoblje/pomocnoosoblje.entity';

export class ZdravstvenaUstanova {
  id: number;
  naziv: string;
  adresa: string;
  kontaktTelefon: string;
  pacijenti?: Pacijent[] | null;
  doktori?: Doktor[] | null;
  pomocnoosoblje?: Pomocnoosoblje[] | null;
}
export class ZdravstvenaUstanovaInput {
  naziv: string;
  adresa: string;
  kontaktTelefon: string;
  pacijenti?: Pacijent[] | null;
  doktori?: Doktor[] | null;
  pomocnoosoblje?: Pomocnoosoblje[] | null;
}
