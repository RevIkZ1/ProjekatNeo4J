import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZdravstvenaustanovaComponent } from './zdravstvenaustanova/zdravstvenaustanova.component';
import { ZdravstvenaComponent } from './zdravstvena/zdravstvena.component';
import { LoginComponent } from './login/login.component';
import { DoktorComponent } from './doktor/doktor.component';
import { PacijenttComponent } from './pacijentt/pacijentt.component';
import { LekoviComponent } from './lekovi/lekovi.component';
import { PomocnoosobljeComponent } from './pomocnoosoblje/pomocnoosoblje.component';

const routes: Routes = [
  {
    path: '',
    component: ZdravstvenaustanovaComponent,
  },
  {
    path: 'zdravstvenaustanova/:id',
    component: ZdravstvenaComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'doktor/:id', component: DoktorComponent },
  { path: 'pacijent/:id', component: PacijenttComponent },
  { path: 'lekovi/:id', component: LekoviComponent },
  { path: 'pomocnoosoblje/:id', component: PomocnoosobljeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
