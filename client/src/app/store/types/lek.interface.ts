import { EntityState } from '@ngrx/entity';
import { Lek, LekModel } from './lek.module';

export interface LekState extends EntityState<LekModel> {
  isLoading: boolean;
  lek: Lek | null;
  error: string | null;
  update: boolean;
}
