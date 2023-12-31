import { Module } from '@nestjs/common';

import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { QueryRepository } from 'src/neo4j/query.repository';

import { ReceptService } from './recept.service';
import { ReceptController } from './recept.controller';

@Module({
  imports: [Neo4jModule],
  providers: [ReceptService, ReceptController, QueryRepository],
  controllers: [ReceptController],
  exports: [ReceptService],
})
export class ReceptModule {}
