import { Module } from '@nestjs/common';
import { ZdravstvenaustanovaService } from './zdravstvenaustanova.service';
import { ZdravstvenaustanovaController } from './zdravstvenaustanova.controller';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { QueryRepository } from 'src/neo4j/query.repository';

@Module({
  imports: [Neo4jModule],
  providers: [
    ZdravstvenaustanovaService,
    ZdravstvenaustanovaController,
    QueryRepository,
  ],
  controllers: [ZdravstvenaustanovaController],
  exports: [ZdravstvenaustanovaService],
})
export class ZdravstvenaustanovaModule {}
