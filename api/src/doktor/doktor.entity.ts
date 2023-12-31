import { ZdravstvenaUstanova } from 'src/zdravstvenaustanova/zdravstvenaustanova.entity';

export class Doktor {
  id: number;
  ime: string;
  prezime: string;
  specijalizacija: string;
  brojtelefona: string;
  ordinacija: string;
  email: string;
  zdravstvenaUstanovaId: ZdravstvenaUstanova;
}
export class DoktorInput {
  ime?: string | null;
  prezime?: string | null;
  specijalizacija?: string | null;
  brojtelefona?: string | null;
  ordinacija?: string | null;
  email?: string | null;
  zdravstvenaUstanovaId?: ZdravstvenaUstanova | null;
}
