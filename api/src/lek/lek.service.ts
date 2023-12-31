import { Injectable, NotFoundException } from '@nestjs/common';
import { Lek, LekInput } from './lek.entity';
import { Record, QueryResult, Node } from 'neo4j-driver';
import { Neo4jService } from 'src/neo4j/neo4j.service';

interface Neo4jLekRecord extends Record {
  lek?: Node; // Može biti opcionalan
}

@Injectable()
export class LekService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async createLek(lekInput: LekInput): Promise<Lek> {
    try {
      const { naziv, kolicina, zdravstvenaUstanovaId } = lekInput;

      const result: QueryResult = await this.neo4jService.write(
        `MATCH (z:ZdravstvenaUstanova)
         WHERE ID(z) = $zdravstvenaUstanovaId
         CREATE (lek:Lek {naziv: $naziv, kolicina: $kolicina})
         CREATE (lek)-[:PRIPADA]->(z)
         RETURN lek`,
        {
          naziv,
          kolicina,
          zdravstvenaUstanovaId,
        },
      );

      if (result?.records?.length > 0) {
        const lekRecord: Neo4jLekRecord = result.records[0] as Neo4jLekRecord;

        // Pokušajte pristupiti podacima putem metode get
        const lekNode: Node | undefined = lekRecord?.get('lek');

        if (lekNode) {
          const lek: Lek = {
            id: lekNode.identity.toNumber(),
            naziv: lekNode.properties.naziv,
            kolicina: lekNode.properties.kolicina,

            zdravstvenaUstanovaId: lekNode.properties.zdravstvenaUstanovaId,
          };
          return lek;
        } else {
          console.error(
            'Neo4j rezultat nema očekivane podatke o leku:',
            result,
          );
          throw new Error('Nije moguće dobiti podatke o leku.');
        }
      } else {
        console.error('Neo4j rezultat nije sadržao očekivane zapise:', result);
        throw new Error('Nema podataka u rezultatu.');
      }
    } catch (error) {
      console.error('Greška prilikom kreiranja leka:', error);
      throw error;
    }
  }
  async uzmiLek(
    zdravstvenaUstanovaId: number,
    kolicina: number,
    naziv: string,
  ): Promise<Lek | null> {
    try {
      // Pronađi lek po nazivu i zdravstvenoj ustanovi
      const findLekResult: QueryResult = await this.neo4jService.read(
        `
        MATCH (lek:Lek)-[:PRIPADA]->(z:ZdravstvenaUstanova)
        WHERE ID(z) = ${zdravstvenaUstanovaId} AND lek.naziv = '${naziv}'
        RETURN lek
      `,
        {},
      );

      if (!findLekResult || findLekResult.records.length === 0) {
        throw new NotFoundException(
          `Lek with naziv ${naziv} not found in Zdravstvena Ustanova with ID ${zdravstvenaUstanovaId}`,
        );
      }

      const lekRecord: Node | undefined = findLekResult.records[0].get('lek');
      if (!lekRecord) {
        throw new Error('Unable to get data about the lek.');
      }

      const staraKolicina: number = lekRecord.properties.kolicina;

      // Proveri da li postoji dovoljno leka za uzimanje
      if (staraKolicina < kolicina) {
        console.error('Nema dovoljno leka za uzimanje.');
        throw new Error('Nema dovoljno leka za uzimanje.');
      }

      // Izmeni količinu leka
      const novaKolicina: number = staraKolicina - kolicina;
      const updateLekQuery = `
        MATCH (lek:Lek)-[:PRIPADA]->(ustanova:ZdravstvenaUstanova)
        WHERE ID(lek) = ${lekRecord.identity} AND lek.naziv = $naziv
        SET lek.kolicina = $novaKolicina
        RETURN lek
      `;

      const updateLekResult: QueryResult = await this.neo4jService.write(
        updateLekQuery,
        {
          naziv,
          novaKolicina,
        },
      );

      const updatedLekRecord: Node | undefined =
        updateLekResult.records[0]?.get('lek');
      if (!updatedLekRecord) {
        throw new Error('Unable to get data about the updated lek.');
      }

      // Kreiraj objekat koji predstavlja ažuriran lek
      const updatedLek: Lek = {
        id: updatedLekRecord.identity.toNumber(),
        naziv: updatedLekRecord.properties.naziv,
        kolicina: novaKolicina,
        zdravstvenaUstanovaId:
          updatedLekRecord.properties.zdravstvenaUstanovaId,
      };

      return updatedLek;
    } catch (error) {
      console.error('Error updating the lek:', error);
      throw error;
    }
  }
  async getLekByZdravstvenaUstanovaId(
    zdravstvenaUstanovaId: number,
  ): Promise<Lek[]> {
    try {
      const nesto = zdravstvenaUstanovaId;
      const result: QueryResult = await this.neo4jService.read(
        `MATCH (lek:Lek)-[:PRIPADA]->(z:ZdravstvenaUstanova)
         WHERE ID(z) = ${nesto}
         RETURN lek`,
        { nesto },
      );
      console.log(
        'Searching for doctors with health institution ID:',
        zdravstvenaUstanovaId,
      );

      console.log('Query result:', result);
      if (result?.records?.length > 0) {
        const lekovi: Lek[] = result.records.map((record: Neo4jLekRecord) => {
          const lekNode: Node | undefined = record?.get('lek');

          if (lekNode) {
            return {
              id: lekNode.identity.toNumber(),
              naziv: lekNode.properties.naziv,
              kolicina: lekNode.properties.kolicina,
              zdravstvenaUstanovaId: lekNode.properties.zdravstvenaUstanovaId,
            };
          } else {
            console.error(
              'Neo4j rezultat nema očekivane podatke o lek:',
              result,
            );
            throw new Error('Nije moguće dobiti podatke o lek.');
          }
        });
        return lekovi;
      } else {
        return [];
      }
    } catch (error) {
      console.error(
        'Greška prilikom dobijanja leka po zdravstvenoj ustanovi:',
        error,
      );
      throw error;
    }
  }
}
