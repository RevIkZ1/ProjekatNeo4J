import { Lek } from 'src/lek/lek.entity';
import { Pregled } from 'src/pregled/pregled.entity';
import { Recept } from 'src/recept/recept.entity';
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
  recepti?: Recept[] | null;
  pregledi?: Pregled[] | null;
}
export class DoktorInput {
  ime?: string | null;
  prezime?: string | null;
  specijalizacija?: string | null;
  brojtelefona?: string | null;
  ordinacija?: string | null;
  email?: string | null;
  zdravstvenaUstanovaId?: ZdravstvenaUstanova | null;
  recepti?: Recept[] | null;
  pregledi?: Pregled[] | null;
}
