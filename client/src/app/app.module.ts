import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ZdravstvenaustanovaComponent } from './zdravstvenaustanova/zdravstvenaustanova.component';
import { ZdravstvenaUstanovaEffects } from './store/effects/zdravstvenaustanova.effects';
import { reducer } from './store/reducers/zdravstvenaustanova.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ZdravstvenaComponent } from './zdravstvena/zdravstvena.component';
import { reducer1 } from './store/reducers/doktor.reducers';
import { DoktorEffects } from './store/effects/doktor.effects';
import { reducer2 } from './store/reducers/pacijent.reducers';
import { PacijentEffects } from './store/effects/pacijent.effects';
import { LoginComponent } from './login/login.component';
import { AdminEffects } from './store/effects/admin.effects';
import { reducers } from './store/reducers/admin.reducers';
import { HeaderComponent } from './header/header.component';
import { DatePipe } from '@angular/common';
import { DoktorComponent } from './doktor/doktor.component';
import { PacijenttComponent } from './pacijentt/pacijentt.component';
import { PregledEffects } from './store/effects/pregled.effects';
import { reducer4 } from './store/reducers/pregled.reducers';
import { ReceptEffects } from './store/effects/recept.effects';
import { reducer5 } from './store/reducers/recept.selector';
import { LekEffects } from './store/effects/lek.effects';
import { reducer6 } from './store/reducers/lek.reducers';
import { LekoviComponent } from './lekovi/lekovi.component';
import { PomocnoosobljeComponent } from './pomocnoosoblje/pomocnoosoblje.component';
import { PomocnoOsobljeEffects } from './store/effects/pomocnoosoblje.effects';
import { reducer7 } from './store/reducers/pomocnoosoblje.reducers';

@NgModule({
  declarations: [
    AppComponent,
    ZdravstvenaustanovaComponent,
    ZdravstvenaComponent,
    LoginComponent,
    HeaderComponent,
    DoktorComponent,
    PacijenttComponent,
    LekoviComponent,
    PomocnoosobljeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}), // Ensure this line is present
    StoreModule.forFeature('ZdravstvenaUstanova', reducer),
    StoreModule.forFeature('Doktor', reducer1),
    StoreModule.forFeature('Pacijent', reducer2),
    StoreModule.forFeature('Admin', reducers),
    StoreModule.forFeature('Pregled', reducer4),
    StoreModule.forFeature('Recept', reducer5),
    StoreModule.forFeature('Lek', reducer6),
    StoreModule.forFeature('PomocnoOsoblje', reducer7),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: true,
      autoPause: true,
    }),
    EffectsModule.forRoot([
      PomocnoOsobljeEffects,
      LekEffects,
      PregledEffects,
      AdminEffects,
      ZdravstvenaUstanovaEffects,
      DoktorEffects,
      PacijentEffects,
      ReceptEffects,
    ]),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
