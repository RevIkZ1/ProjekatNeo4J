import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from './neo4j/neo4j.module';
import { PacijentModule } from './pacijent/pacijent/pacijent.module';
import { QueryRepository } from './neo4j/query.repository';
import { ZdravstvenaustanovaModule } from './zdravstvenaustanova/zdravstvenaustanova.module';
import { DoktorModule } from './doktor/doktor.module';
import { PregledModule } from './pregled/pregled.module';
import { ReceptModule } from './recept/recept.module';
import { PomocnoosobljeModule } from './pomocnoosoblje/pomocnoosoblje/pomocnoosoblje.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { LoggedGuard } from './guards/logged.guard';
import { AdminModule } from './admin/admin.module';
import { LekModule } from './lek/lek.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '3h' },
    }),
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: '573a6922.databases.neo4j.io',
      port: 7687,
      username: 'neo4j',
      password: 'h4KyKrqVEg-RTMotsIFm0CzooJFFv_dLFvnHaNufknI',
    }),
    AdminModule,
    AuthModule,
    LekModule,
    PomocnoosobljeModule,
    ReceptModule,
    PregledModule,
    DoktorModule,
    PacijentModule,
    ZdravstvenaustanovaModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppController, QueryRepository, LoggedGuard],
})
export class AppModule {}
