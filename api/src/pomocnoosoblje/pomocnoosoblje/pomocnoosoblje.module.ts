import { Module } from '@nestjs/common';

import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { QueryRepository } from 'src/neo4j/query.repository';
import { PomocnoosobljeService } from './pomocnoosoblje.service';
import { PomocnoosobljeController } from './pomocnoosoblje.controller';

@Module({
  imports: [Neo4jModule],
  providers: [PomocnoosobljeService, PomocnoosobljeController, QueryRepository],
  controllers: [PomocnoosobljeController],
  exports: [PomocnoosobljeService],
})
export class PomocnoosobljeModule {}
