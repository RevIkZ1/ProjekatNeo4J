import { ZdravstvenaUstanova } from 'src/zdravstvenaustanova/zdravstvenaustanova.entity';

export class Lek {
  id: number;
  naziv: string;
  kolicina: number;
  zdravstvenaUstanovaId: ZdravstvenaUstanova;
}
export class LekInput {
  naziv?: string | null;
  kolicina?: number | null;
  zdravstvenaUstanovaId: ZdravstvenaUstanova | null;
}
