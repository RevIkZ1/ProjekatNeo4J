import { EntityState } from '@ngrx/entity';
import { Recept, ReceptModel } from './recept.module';

export interface ReceptState extends EntityState<ReceptModel> {
  isLoading: boolean;
  recept: Recept | null;
  error: string | null;
  update: boolean;
}
