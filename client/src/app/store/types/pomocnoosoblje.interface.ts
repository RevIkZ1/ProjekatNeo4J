import { EntityState } from '@ngrx/entity';
import { PomocnoOsoblje, PomocnoOsobljeModel } from './pomocnoosoblje.module';

export interface PomocnoOsoboljeState extends EntityState<PomocnoOsobljeModel> {
  isLoading: boolean;
  pomocnoosoblje: PomocnoOsoblje | null;
  error: string | null;
  update: boolean;
}
