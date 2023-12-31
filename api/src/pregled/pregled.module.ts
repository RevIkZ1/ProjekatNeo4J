import { Module } from '@nestjs/common';

import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { QueryRepository } from 'src/neo4j/query.repository';

import { PregledService } from './pregled.service';
import { PregledController } from './pregled.controller';

@Module({
  imports: [Neo4jModule],
  providers: [PregledService, PregledController, QueryRepository],
  controllers: [PregledController],
  exports: [PregledService],
})
export class PregledModule {}
