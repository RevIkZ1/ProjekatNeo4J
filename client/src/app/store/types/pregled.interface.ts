import { EntityState } from '@ngrx/entity';
import { Pregled, PregledModel } from './pregled.module';

export interface PregledState extends EntityState<PregledModel> {
  isLoading: boolean;
  pregled: Pregled | null;
  error: string | null;
  update: boolean;
}
