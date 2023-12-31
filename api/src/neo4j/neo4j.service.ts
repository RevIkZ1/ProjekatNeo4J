import { Inject, Injectable } from '@nestjs/common';
import { Neo4jConfig } from 'src/neo4j-config/neo4j-config.interface';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';
import { Driver, Result } from 'neo4j-driver-core';
import neo4j from 'neo4j-driver';
@Injectable()
export class Neo4jService {
  async runQuery(query: string, params?: Record<string, any>): Promise<any> {
    const session = this.driver.session();

    try {
      const result = await session.run(query, params);
      return result;
    } finally {
      await session.close();
    }
  }
  constructor(
    @Inject(NEO4J_CONFIG) private readonly config: Neo4jConfig,
    @Inject(NEO4J_DRIVER) private readonly driver: Driver,
  ) {}
  getDriver(): Driver {
    return this.driver;
  }
  getConfig(): Neo4jConfig {
    return this.config;
  }

  getReadSession(database?: string) {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.READ,
    });
  }
  getWriteSession(database?: string) {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.WRITE,
    });
  }
  read(cypher: string, params: Record<string, any>, database?: string): Result {
    const session = this.getReadSession();
    return session.run(cypher, params);
  }
  write(
    cypher: string,
    params: Record<string, any>,
    database?: string,
  ): Result {
    const session = this.getWriteSession();
    return session.run(cypher, params);
  }
}
