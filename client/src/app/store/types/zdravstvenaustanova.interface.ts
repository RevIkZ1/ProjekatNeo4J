import { EntityState } from '@ngrx/entity';
import {
  ZdravstvenaUstanova,
  ZdravstvenaUstanovaModel,
} from './zdravstvenaustanova.module';

export interface ZdravstvenaUstanovaState
  extends EntityState<ZdravstvenaUstanovaModel> {
  isLoading: boolean;
  zdravstvenaustanova: ZdravstvenaUstanova | null;
  error: string | null;
  update: boolean;
}
