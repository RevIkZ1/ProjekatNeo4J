import { Pacijent } from 'src/pacijent/pacijent/pacijent.entity';

export class ZdravstvenaUstanova {
  id: number;
  naziv: string;
  adresa: string;
  kontaktTelefon: string;
  pacijenti?: Pacijent[] | null;
}
export class ZdravstvenaUstanovaInput {
  naziv: string;
  adresa: string;
  kontaktTelefon: string;
  pacijenti?: Pacijent[] | null;
}
