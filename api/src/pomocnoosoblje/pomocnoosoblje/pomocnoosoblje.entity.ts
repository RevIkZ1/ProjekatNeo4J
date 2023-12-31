import { ZdravstvenaUstanova } from 'src/zdravstvenaustanova/zdravstvenaustanova.entity';

export class Pomocnoosoblje {
  id: number;
  ime: string;
  prezime: string;
  uloga: string;
  brojtelefona: string;
  radnomesto: string;
  email: string;
  zdravstvenaUstanovaId: ZdravstvenaUstanova;
}

export class PomocnoosobljeInput {
  ime: string | null;
  prezime: string | null;
  uloga: string | null;
  brojtelefona: string | null;
  radnomesto: string | null;
  email: string | null;
  zdravstvenaUstanovaId: ZdravstvenaUstanova | null;
}
