import neo4j, { Driver } from 'neo4j-driver';
import { Neo4jConfig } from 'src/neo4j-config/neo4j-config.interface';

export const createDriver = async (config: Neo4jConfig): Promise<Driver> => {
  const driver: Driver = neo4j.driver(
    `neo4j+s://${config.host}`,
    neo4j.auth.basic(config.username, config.password),
  );

  await driver.verifyConnectivity();

  return driver;
};
