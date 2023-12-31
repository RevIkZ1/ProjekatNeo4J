import { Module } from '@nestjs/common';
import { PacijentService } from './pacijent.service';
import { PacijentController } from './pacijent.controller';
import { Pacijent } from './pacijent.entity';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { QueryRepository } from 'src/neo4j/query.repository';

@Module({
  imports: [Neo4jModule],
  providers: [PacijentService, PacijentController, QueryRepository],
  controllers: [PacijentController],
  exports: [PacijentService],
})
export class PacijentModule {}
