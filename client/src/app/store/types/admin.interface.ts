import { EntityState } from '@ngrx/entity';
import { Admin, AdminModel } from './admin.module';

export interface AdminState extends EntityState<AdminModel> {
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  admin: AdminModel | null;
}
