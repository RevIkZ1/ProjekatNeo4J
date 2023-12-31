import { EntityState } from '@ngrx/entity';
import { Pacijent, PacijentModel } from './pacijent.module';

export interface PacijentState extends EntityState<PacijentModel> {
  isLoading: boolean;
  pacijent: Pacijent | null;
  error: string | null;
  update: boolean;
}
