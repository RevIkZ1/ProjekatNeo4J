import { Injectable, NotFoundException } from '@nestjs/common';
import { Record, QueryResult, Node } from 'neo4j-driver';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { Doktor, DoktorInput } from './doktor.entity';

interface Neo4jDoktorRecord extends Record {
  doktor?: Node; // Može biti opcionalan
}

@Injectable()
export class DoktorService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async createDoktor(doktorInput: DoktorInput): Promise<Doktor> {
    try {
      const {
        ime,
        prezime,
        specijalizacija,
        brojtelefona,
        ordinacija,
        email,
        zdravstvenaUstanovaId,
      } = doktorInput;

      const result: QueryResult = await this.neo4jService.write(
        `MATCH (z:ZdravstvenaUstanova)
         WHERE ID(z) = $zdravstvenaUstanovaId
         CREATE (doktor:Doktor {ime: $ime, prezime: $prezime, specijalizacija: $specijalizacija, brojtelefona: $brojtelefona, ordinacija: $ordinacija, email: $email})
         CREATE (doktor)-[:PRIPADA]->(z)
         RETURN doktor`,
        {
          ime,
          prezime,
          specijalizacija,
          brojtelefona,
          ordinacija,
          email,
          zdravstvenaUstanovaId,
        },
      );

      if (result?.records?.length > 0) {
        const doktorRecord: Neo4jDoktorRecord = result
          .records[0] as Neo4jDoktorRecord;

        // Pokušajte pristupiti podacima putem metode get
        const doktorNode: Node | undefined = doktorRecord?.get('doktor');

        if (doktorNode) {
          const doktor: Doktor = {
            id: doktorNode.identity.toNumber(),
            ime: doktorNode.properties.ime,
            prezime: doktorNode.properties.prezime,
            specijalizacija: doktorNode.properties.specijalizacija,
            brojtelefona: doktorNode.properties.brojtelefona,
            ordinacija: doktorNode.properties.ordinacija,
            email: doktorNode.properties.email,
            zdravstvenaUstanovaId: doktorNode.properties.zdravstvenaUstanovaId,
          };
          return doktor;
        } else {
          console.error(
            'Neo4j rezultat nema očekivane podatke o doktor:',
            result,
          );
          throw new Error('Nije moguće dobiti podatke o doktor.');
        }
      } else {
        console.error('Neo4j rezultat nije sadržao očekivane zapise:', result);
        throw new Error('Nema podataka u rezultatu.');
      }
    } catch (error) {
      console.error('Greška prilikom kreiranja doktora:', error);
      throw error;
    }
  }
  async deleteDoktorById(id1: number): Promise<void> {
    try {
      const id = id1;

      // Proveri postojanje doktora
      const checkDoktorResult: QueryResult = await this.neo4jService.read(
        `MATCH (doktor:Doktor) WHERE ID(doktor) = ${id} RETURN doktor`,
        {},
      );

      if (!checkDoktorResult || checkDoktorResult.records.length === 0) {
        throw new NotFoundException(`Doktor with ID ${id} not found`);
      }

      // Zatim obriši veze koje doktor ima
      const deleteRelationshipsResult: QueryResult =
        await this.neo4jService.write(
          `MATCH (doktor)-[r]-() WHERE ID(doktor) = ${id} DELETE r`,
          {},
        );

      // Zatim obriši samog doktora
      const deleteDoktorResult: QueryResult = await this.neo4jService.write(
        `MATCH (doktor:Doktor) WHERE ID(doktor) = ${id} DELETE doktor`,
        {},
      );

      console.log(deleteRelationshipsResult, 'DELETE RELATIONSHIPS RESULT');
      console.log(deleteDoktorResult, 'DELETE DOKTOR RESULT');
    } catch (error) {
      console.error('Greška prilikom brisanja doktora:', error);
      throw error;
    }
  }
  async getAllDoktori(): Promise<Doktor[]> {
    try {
      const result: QueryResult = await this.neo4jService.read(
        `MATCH (doktor:Doktor) RETURN doktor`,
        {},
      );

      if (result?.records?.length > 0) {
        const doktori: Doktor[] = result.records.map(
          (record: Neo4jDoktorRecord) => {
            const doktorNode: Node | undefined = record?.get('doktor');

            if (doktorNode) {
              return {
                id: doktorNode.identity.toNumber(),
                ime: doktorNode.properties.ime,
                prezime: doktorNode.properties.prezime,
                specijalizacija: doktorNode.properties.specijalizacija,
                brojtelefona: doktorNode.properties.brojtelefona,
                ordinacija: doktorNode.properties.ordinacija,
                email: doktorNode.properties.email,
                zdravstvenaUstanovaId:
                  doktorNode.properties.zdravstvenaUstanovaId,
              };
            } else {
              console.error(
                'Neo4j rezultat nema očekivane podatke o doktoru:',
                result,
              );
              throw new Error('Nije moguće dobiti podatke o doktoru.');
            }
          },
        );

        return doktori;
      } else {
        console.error('Neo4j rezultat nije sadržao očekivane zapise:', result);
        throw new Error('Nema podataka u rezultatu.');
      }
    } catch (error) {
      console.error('Greška prilikom dobijanja svih doktora:', error);
      throw error;
    }
  }
  async getDoktoriByZdravstvenaUstanovaId(
    zdravstvenaUstanovaId: number,
  ): Promise<Doktor[]> {
    try {
      const nesto = zdravstvenaUstanovaId;
      const result: QueryResult = await this.neo4jService.read(
        `MATCH (doktor:Doktor)-[:PRIPADA]->(z:ZdravstvenaUstanova)
         WHERE ID(z) = ${nesto}
         RETURN doktor`,
        { nesto },
      );
      console.log(
        'Searching for doctors with health institution ID:',
        zdravstvenaUstanovaId,
      );

      if (result?.records?.length > 0) {
        const doktori: Doktor[] = result.records.map(
          (record: Neo4jDoktorRecord) => {
            const doktorNode: Node | undefined = record?.get('doktor');

            if (doktorNode) {
              return {
                id: doktorNode.identity.toNumber(),
                ime: doktorNode.properties.ime,
                prezime: doktorNode.properties.prezime,
                specijalizacija: doktorNode.properties.specijalizacija,
                brojtelefona: doktorNode.properties.brojtelefona,
                ordinacija: doktorNode.properties.ordinacija,
                email: doktorNode.properties.email,
                zdravstvenaUstanovaId:
                  doktorNode.properties.zdravstvenaUstanovaId,
              };
            } else {
              console.error(
                'Neo4j rezultat nema očekivane podatke o doktoru:',
                result,
              );
              throw new Error('Nije moguće dobiti podatke o doktoru.');
            }
          },
        );
        return doktori;
      } else {
        return [];
      }
    } catch (error) {
      console.error(
        'Greška prilikom dobijanja doktora po zdravstvenoj ustanovi:',
        error,
      );
      throw error;
    }
  }
  async getDoktorById(id: number): Promise<Doktor | null> {
    try {
      const result: QueryResult = await this.neo4jService.read(
        `MATCH (z:Doktor) WHERE ID(z) =${id} RETURN z`,
        {},
      );
      const record: Neo4jDoktorRecord | undefined = result.records[0];
      if (record) {
        const doktorNode: Node | undefined = record.get('z');
        if (doktorNode) {
          return {
            id: doktorNode.identity.toNumber(),
            ime: doktorNode.properties.ime,
            prezime: doktorNode.properties.prezime,
            specijalizacija: doktorNode.properties.specijalizacija,
            brojtelefona: doktorNode.properties.brojtelefona,
            ordinacija: doktorNode.properties.ordinacija,
            email: doktorNode.properties.email,
            zdravstvenaUstanovaId: doktorNode.properties.zdravstvenaUstanovaId,
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
  async updateDoktorById(
    id: number,
    doktorInput: DoktorInput,
  ): Promise<Doktor | null> {
    try {
      const checkDoktorResult: QueryResult = await this.neo4jService.read(
        `MATCH (doktor:Doktor) WHERE ID(doktor) = ${id} RETURN doktor`,
        {},
      );

      if (!checkDoktorResult || checkDoktorResult.records.length === 0) {
        throw new NotFoundException(`Doktor with ID ${id} not found`);
      }

      // Update the doctor's properties
      const updateDoktorResult: QueryResult = await this.neo4jService.write(
        `MATCH (doktor:Doktor) WHERE ID(doktor) = ${id}
         SET doktor.ime = $ime, doktor.prezime = $prezime, doktor.specijalizacija = $specijalizacija,
             doktor.brojtelefona = $brojtelefona, doktor.ordinacija = $ordinacija, doktor.email = $email
         RETURN doktor`,
        doktorInput,
      );

      // Extract and return the updated doctor
      const updatedDoktorRecord: Neo4jDoktorRecord | undefined =
        updateDoktorResult.records[0];

      if (updatedDoktorRecord) {
        const updatedDoktorNode: Node | undefined =
          updatedDoktorRecord.get('doktor');

        if (updatedDoktorNode) {
          const updatedDoktor: Doktor = {
            id: id,
            ime: updatedDoktorNode.properties.ime,
            prezime: updatedDoktorNode.properties.prezime,
            specijalizacija: updatedDoktorNode.properties.specijalizacija,
            brojtelefona: updatedDoktorNode.properties.brojtelefona,
            ordinacija: updatedDoktorNode.properties.ordinacija,
            email: updatedDoktorNode.properties.email,
            zdravstvenaUstanovaId:
              updatedDoktorNode.properties.zdravstvenaUstanovaId,
          };
          return updatedDoktor;
        } else {
          console.error(
            'Neo4j result does not have expected data about the updated doctor:',
            updateDoktorResult,
          );
          throw new Error('Unable to get data about the updated doctor.');
        }
      } else {
        console.error(
          'Neo4j result did not contain expected records:',
          updateDoktorResult,
        );
        throw new Error('No data in the result.');
      }
    } catch (error) {
      console.error('Error updating the doctor:', error);
      throw error;
    }
  }
}
