import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryRepository } from 'src/neo4j/query.repository';
import { Pacijent, PacijentInput } from './pacijent.entity';

@Injectable()
export class PacijentRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  /*async createPacijent(pacijentInput: PacijentInput): Promise<Pacijent> {
    const { ime, prezime, email, photo } = pacijentInput;
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `CREATE (pacijent:Pacijent {ime: "${ime}", prezime: "${prezime}", email "${email}",photo "${photo}"}) 
    RETURN pacijent`,
      )
      .run();

    if (query?.length > 0) {
      const {
        pacijent: { identity, properties },
      } = query[0];
      return {
        id: identity,
        ...properties,
      };
    }
  }
  async deletePacijentById(id: number): Promise<void> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (pacijent:Pacijent) WHERE ID(pacijent) = ${id} DELETE pacijent`,
      )
      .run();

    if (!query || query.length === 0) {
      throw new NotFoundException(`Pacijent with ID ${id} not found`);
    }
  }*/
}
