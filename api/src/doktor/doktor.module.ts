import { Module } from '@nestjs/common';

import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { QueryRepository } from 'src/neo4j/query.repository';
import { DoktorService } from './doktor.service';
import { DoktorController } from './doktor.controller';

@Module({
  imports: [Neo4jModule],
  providers: [DoktorService, DoktorController, QueryRepository],
  controllers: [DoktorController],
  exports: [DoktorService],
})
export class DoktorModule {}
