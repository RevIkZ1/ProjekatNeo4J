import { EntityState } from '@ngrx/entity';
import { Doktor, DoktorModel } from './doktor.module';

export interface DoktorState extends EntityState<DoktorModel> {
  isLoading: boolean;
  doktor: Doktor | null;
  error: string | null;
  update: boolean;
}
