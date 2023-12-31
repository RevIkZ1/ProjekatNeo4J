import { Module } from '@nestjs/common';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { QueryRepository } from 'src/neo4j/query.repository';
import { LekService } from './lek.service';
import { LekController } from './lek.controller';

@Module({
  imports: [Neo4jModule],
  providers: [LekService, LekController, QueryRepository],
  controllers: [LekController],
  exports: [LekService],
})
export class LekModule {}
