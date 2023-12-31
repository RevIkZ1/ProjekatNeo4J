import { Injectable } from '@nestjs/common';
import { Record, QueryResult, Node } from 'neo4j-driver';
import { Neo4jService } from '../neo4j/neo4j.service'; // Prilagodite stazu prema strukturi vašeg projekta
import {
  ZdravstvenaUstanova,
  ZdravstvenaUstanovaInput,
} from './zdravstvenaustanova.entity';

interface Neo4jPacijentRecord extends Record {
  zdravstvenaustanova?: Node; // Može biti opcionalan
}

@Injectable()
export class ZdravstvenaustanovaService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async createPacijent(
    zdravstvenaUstanova: ZdravstvenaUstanovaInput,
  ): Promise<ZdravstvenaUstanova> {
    try {
      const { naziv, adresa, kontaktTelefon } = zdravstvenaUstanova;

      const result: QueryResult = await this.neo4jService.write(
        `CREATE (zdravstvenaustanova:ZdravstvenaUstanova {naziv: $naziv, adresa: $adresa, kontaktTelefon: $kontaktTelefon}) 
             RETURN zdravstvenaustanova`,
        {
          naziv,
          adresa,
          kontaktTelefon,
        },
      );

      if (result?.records?.length > 0) {
        const zdravstvenaustanovaRecord: Neo4jPacijentRecord = result
          .records[0] as Neo4jPacijentRecord;

        // Pokušajte pristupiti podacima putem metode get
        const zdravstvenaUstanovaNode: Node | undefined =
          zdravstvenaustanovaRecord?.get('zdravstvenaustanova');

        if (zdravstvenaUstanovaNode) {
          const zdravstvenaUstanova1: ZdravstvenaUstanova = {
            id: zdravstvenaUstanovaNode.identity.toNumber(),
            naziv: zdravstvenaUstanovaNode.properties.naziv,
            kontaktTelefon: zdravstvenaUstanovaNode.properties.kontaktTelefon,
            adresa: zdravstvenaUstanovaNode.properties.adresa,
          };
          return zdravstvenaUstanova1;
        } else {
          console.error(
            'Neo4j rezultat nema očekivane podatke o zdravstvenojustanovi:',
            result,
          );
          throw new Error('Nije moguće dobiti podatke o zdravstvenojustanovi.');
        }
      } else {
        console.error('Neo4j rezultat nije sadržao očekivane zapise:', result);
        throw new Error('Nema podataka u rezultatu.');
      }
    } catch (error) {
      console.error('Greška prilikom kreiranja zdravstvenojustanovi:', error);
      throw error;
    }
  }
  async getAllZdravstveneUstanove(): Promise<ZdravstvenaUstanova[]> {
    try {
      const result: QueryResult = await this.neo4jService.read(
        'MATCH (z:ZdravstvenaUstanova) RETURN z',
        {},
      );

      const zdravstveneUstanove: ZdravstvenaUstanova[] = result.records.map(
        (record: Neo4jPacijentRecord) => {
          const zdravstvenaUstanovaNode: Node | undefined = record?.get('z');

          if (zdravstvenaUstanovaNode) {
            return {
              id: zdravstvenaUstanovaNode.identity.toNumber(),
              naziv: zdravstvenaUstanovaNode.properties.naziv,
              kontaktTelefon: zdravstvenaUstanovaNode.properties.kontaktTelefon,
              adresa: zdravstvenaUstanovaNode.properties.adresa,
            };
          } else {
            console.error(
              'Neo4j rezultat nema očekivane podatke o zdravstvenim ustanovama:',
              result,
            );
            throw new Error(
              'Nije moguće dobiti podatke o zdravstvenim ustanovama.',
            );
          }
        },
      );

      return zdravstveneUstanove;
    } catch (error) {
      console.error(
        'Greška prilikom dobijanja svih zdravstvenih ustanova:',
        error,
      );
      throw error;
    }
  }
  async getZdravstvenaUstanovaById(
    id: number,
  ): Promise<ZdravstvenaUstanova | null> {
    try {
      const result: QueryResult = await this.neo4jService.read(
        `MATCH (z:ZdravstvenaUstanova) WHERE ID(z) = ${id} RETURN z`,
        {},
      );
      console.log(id);
      const record: Neo4jPacijentRecord | undefined = result.records[0];
      if (record) {
        const zdravstvenaUstanovaNode: Node | undefined = record.get('z');
        console.log(zdravstvenaUstanovaNode.properties.kontaktTelefon);
        if (zdravstvenaUstanovaNode) {
          return {
            id: zdravstvenaUstanovaNode.identity.toNumber(),
            naziv: zdravstvenaUstanovaNode.properties.naziv,
            kontaktTelefon: zdravstvenaUstanovaNode.properties.kontaktTelefon,
            adresa: zdravstvenaUstanovaNode.properties.adresa,
          };
        } else {
          console.error(
            'Neo4j rezultat nema očekivane podatke o zdravstvenim ustanovama:',
            result,
          );
          throw new Error(
            'Nije moguće dobiti podatke o zdravstvenim ustanovama.',
          );
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error(
        'Greška prilikom dobijanja zdravstvene ustanove po ID-u:',
        error,
      );
      throw error;
    }
  }
}
