import { DynamicModule, Module } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Neo4jConfig } from 'src/neo4j-config/neo4j-config.interface';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';
import { createDriver } from './neo4j.util';
import { QueryRepository } from './query.repository';

@Module({ providers: [QueryRepository] })
export class Neo4jModule {
  static forRoot(config: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      global: true,

      providers: [
        Neo4jService,
        QueryRepository,
        {
          provide: NEO4J_CONFIG,
          useValue: config,
        },
        {
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) => await createDriver(config),
        },
      ],
      exports: [Neo4jService, NEO4J_DRIVER, QueryRepository],
    };
  }
}
