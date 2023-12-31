import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Connection, Query } from 'cypher-query-builder';
import { NEO4J_DRIVER } from './neo4j.constants';

@Injectable()
export class QueryRepository implements OnApplicationShutdown {
  constructor(
    @Inject(NEO4J_DRIVER)
    private readonly connection: Connection,
  ) {}

  onApplicationShutdown() {
    this.connection.close();
  }

  initQuery(): Query {
    if (typeof this.connection.query !== 'function') {
      console.error(
        'this.connection.query is not a function:',
        this.connection,
      );
    }
    return this.connection.query();
  }
}
