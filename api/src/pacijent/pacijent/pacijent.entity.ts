import { Lek } from 'src/lek/lek.entity';
import { Pregled } from 'src/pregled/pregled.entity';
import { Recept } from 'src/recept/recept.entity';
import { ZdravstvenaUstanova } from 'src/zdravstvenaustanova/zdravstvenaustanova.entity';

export class Pacijent {
  id: number;
  ime: string;
  prezime: string;
  datumrodjenja: Date;
  brojtelefona: string;
  brosiguranja: string;
  alergije: string;
  zdravstvenaUstanovaId: ZdravstvenaUstanova;
  recepti?: Recept[] | null;
  pregledi?: Pregled[] | null;
}
export class PacijentInput {
  ime?: string | null;
  prezime?: string | null;
  datumrodjenja?: Date | null;
  brojtelefona?: string | null;
  brosiguranja?: string | null;
  alergije?: string | null;
  zdravstvenaUstanovaId?: ZdravstvenaUstanova | null;
  recepti?: Recept[] | null;
  pregledi?: Pregled[] | null;
}
