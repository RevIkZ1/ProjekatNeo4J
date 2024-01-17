import { Injectable, NotFoundException } from '@nestjs/common';
import { Pacijent, PacijentInput } from './pacijent.entity';
import { Record, QueryResult, Node } from 'neo4j-driver';
import { Neo4jService } from 'src/neo4j/neo4j.service';

interface Neo4jPacijentRecord extends Record {
  pacijent?: Node; // Može biti opcionalan
}

@Injectable()
export class PacijentService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async createPacijent(pacijentInput: PacijentInput): Promise<Pacijent> {
    try {
      const {
        ime,
        prezime,
        datumrodjenja,
        brojtelefona,
        brosiguranja,
        alergije,
        zdravstvenaUstanovaId,
        recepti,
        pregledi,
      } = pacijentInput;

      const result: QueryResult = await this.neo4jService.write(
        `MATCH (z:ZdravstvenaUstanova)
         WHERE ID(z) = $zdravstvenaUstanovaId
         CREATE (pacijent:Pacijent {ime: $ime, prezime: $prezime, datumrodjenja: $datumrodjenja, brojtelefona: $brojtelefona, brosiguranja: $brosiguranja, alergije: $alergije,recepti:$recepti,pregledi:$pregledi})
         CREATE (pacijent)-[:PRIPADA]->(z)
         RETURN pacijent`,
        {
          ime,
          prezime,
          datumrodjenja,
          brojtelefona,
          brosiguranja,
          alergije,
          zdravstvenaUstanovaId,
          recepti,
          pregledi,
        },
      );

      if (result?.records?.length > 0) {
        const pacijentRecord: Neo4jPacijentRecord = result
          .records[0] as Neo4jPacijentRecord;

        // Pokušajte pristupiti podacima putem metode get
        const pacijentNode: Node | undefined = pacijentRecord?.get('pacijent');

        if (pacijentNode) {
          const pacijent: Pacijent = {
            id: pacijentNode.identity.toNumber(),
            ime: pacijentNode.properties.ime,
            prezime: pacijentNode.properties.prezime,
            datumrodjenja: pacijentNode.properties.datumrodjenja,
            brojtelefona: pacijentNode.properties.brojtelefona,
            brosiguranja: pacijentNode.properties.brosiguranja,
            alergije: pacijentNode.properties.alergije,
            zdravstvenaUstanovaId:
              pacijentNode.properties.zdravstvenaUstanovaId,
            recepti: pacijentNode.properties.recepti,
            pregledi: pacijentNode.properties.pregledi,
          };
          return pacijent;
        } else {
          console.error(
            'Neo4j rezultat nema očekivane podatke o pacijentu:',
            result,
          );
          throw new Error('Nije moguće dobiti podatke o pacijentu.');
        }
      } else {
        console.error('Neo4j rezultat nije sadržao očekivane zapise:', result);
        throw new Error('Nema podataka u rezultatu.');
      }
    } catch (error) {
      console.error('Greška prilikom kreiranja pacijenta:', error);
      throw error;
    }
  }
  async deletePacijentById(id1: number): Promise<void> {
    try {
      const id = id1;
      console.log(id1);

      // Proveri postojanje pacijenta
      const checkPacijentResult: QueryResult = await this.neo4jService.read(
        `MATCH (pacijent:Pacijent) WHERE ID(pacijent) = ${id} RETURN pacijent`,
        {},
      );

      if (!checkPacijentResult || checkPacijentResult.records.length === 0) {
        throw new NotFoundException(`Pacijent with ID ${id} not found`);
      }

      // Zatim obriši veze koje pacijent ima
      const deleteRelationshipsResult: QueryResult =
        await this.neo4jService.write(
          `MATCH (pacijent)-[r]-() WHERE ID(pacijent) = ${id} DELETE r`,
          {},
        );

      // Zatim obriši samog pacijenta
      const deletePacijentResult: QueryResult = await this.neo4jService.write(
        `MATCH (pacijent:Pacijent) WHERE ID(pacijent) = ${id} DELETE pacijent`,
        {},
      );

      console.log(deleteRelationshipsResult, 'DELETE RELATIONSHIPS RESULT');
      console.log(deletePacijentResult, 'DELETE PACIJENT RESULT');
    } catch (error) {
      console.error('Greška prilikom brisanja pacijenta:', error);
      throw error;
    }
  }
  async getPacijentByZdravstvenaUstanovaId(
    zdravstvenaUstanovaId: number,
  ): Promise<Pacijent[]> {
    try {
      const nesto = zdravstvenaUstanovaId;
      const result: QueryResult = await this.neo4jService.read(
        `MATCH (pacijent:Pacijent)-[:PRIPADA]->(z:ZdravstvenaUstanova)
         WHERE ID(z) = ${nesto}
         RETURN pacijent`,
        { nesto },
      );
      console.log(
        'Searching for doctors with health institution ID:',
        zdravstvenaUstanovaId,
      );

      console.log('Query result:', result);
      if (result?.records?.length > 0) {
        const pacijenti: Pacijent[] = result.records.map(
          (record: Neo4jPacijentRecord) => {
            const pacijentNode: Node | undefined = record?.get('pacijent');

            if (pacijentNode) {
              return {
                id: pacijentNode.identity.toNumber(),
                ime: pacijentNode.properties.ime,
                prezime: pacijentNode.properties.prezime,
                datumrodjenja: pacijentNode.properties.datumrodjenja,
                brojtelefona: pacijentNode.properties.brojtelefona,
                brosiguranja: pacijentNode.properties.brosiguranja,
                alergije: pacijentNode.properties.alergije,
                zdravstvenaUstanovaId:
                  pacijentNode.properties.zdravstvenaUstanovaId,
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
        return pacijenti;
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
  async getPacijentByPregledId(pregledId: number): Promise<Pacijent | null> {
    try {
      console.log(pregledId);
      const result: QueryResult = await this.neo4jService.read(
        `MATCH (pregled:Pregled)-[:PRIPADA]->(pacijent:Pacijent)
         WHERE ID(pregled) = ${pregledId}
         RETURN pacijent`,
        {},
      );
      console.log(result);
      if (result?.records?.length > 0) {
        const pacijentRecord: Neo4jPacijentRecord = result
          .records[0] as Neo4jPacijentRecord;

        // Pokušajte pristupiti podacima putem metode get
        const pacijentNode: Node | undefined = pacijentRecord?.get('pacijent');

        if (pacijentNode) {
          const pacijent: Pacijent = {
            id: pacijentNode.identity.toNumber(),
            ime: pacijentNode.properties.ime,
            prezime: pacijentNode.properties.prezime,
            datumrodjenja: pacijentNode.properties.datumrodjenja,
            brojtelefona: pacijentNode.properties.brojtelefona,
            brosiguranja: pacijentNode.properties.brosiguranja,
            alergije: pacijentNode.properties.alergije,
            zdravstvenaUstanovaId:
              pacijentNode.properties.zdravstvenaUstanovaId,
          };
          return pacijent;
        } else {
          console.error(
            'Neo4j rezultat nema očekivane podatke o pacijentu:',
            result,
          );
          throw new Error('Nije moguće dobiti podatke o pacijentu.');
        }
      } else {
        // Ako ne postoji povezan pacijent za dati pregled
        return null;
      }
    } catch (error) {
      console.error(
        'Greška prilikom dobijanja pacijenta po ID pregleda:',
        error,
      );
      throw error;
    }
  }
  async getPacijentById(id: number): Promise<Pacijent | null> {
    try {
      const result: QueryResult = await this.neo4jService.read(
        `MATCH (z:Pacijent) WHERE ID(z) =${id} RETURN z`,
        {},
      );
      const record: Neo4jPacijentRecord | undefined = result.records[0];
      if (record) {
        const pacijentNode: Node | undefined = record.get('z');
        if (pacijentNode) {
          return {
            id: pacijentNode.identity.toNumber(),
            ime: pacijentNode.properties.ime,
            prezime: pacijentNode.properties.prezime,
            datumrodjenja: pacijentNode.properties.datumrodjenja,
            brojtelefona: pacijentNode.properties.brojtelefona,
            brosiguranja: pacijentNode.properties.brosiguranja,
            alergije: pacijentNode.properties.alergije,
            zdravstvenaUstanovaId:
              pacijentNode.properties.zdravstvenaUstanovaId,
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
  async updatePacijentById(
    id: number,
    doktorInput: PacijentInput,
  ): Promise<Pacijent | null> {
    try {
      const checkDoktorResult: QueryResult = await this.neo4jService.read(
        `MATCH (pacijent:Pacijent) WHERE ID(pacijent) = ${id} RETURN pacijent`,
        {},
      );

      if (!checkDoktorResult || checkDoktorResult.records.length === 0) {
        throw new NotFoundException(`Pacijent with ID ${id} not found`);
      }

      // Update the doctor's properties
      const updateDoktorResult: QueryResult = await this.neo4jService.write(
        `MATCH (pacijent:Pacijent) WHERE ID(pacijent) = ${id}
         SET pacijent.ime = $ime, pacijent.prezime = $prezime, pacijent.datumrodjenja = $datumrodjenja,
         pacijent.brojtelefona = $brojtelefona, pacijent.brosiguranja = $brosiguranja, pacijent.alergije = $alergije
         RETURN pacijent`,
        doktorInput,
      );

      // Extract and return the updated doctor
      const updatedDoktorRecord: Neo4jPacijentRecord | undefined =
        updateDoktorResult.records[0];

      if (updatedDoktorRecord) {
        const updatedDoktorNode: Node | undefined =
          updatedDoktorRecord.get('pacijent');

        if (updatedDoktorNode) {
          const updatedDoktor: Pacijent = {
            id: id,
            ime: updatedDoktorNode.properties.ime,
            prezime: updatedDoktorNode.properties.prezime,
            datumrodjenja: updatedDoktorNode.properties.datumrodjenja,
            brojtelefona: updatedDoktorNode.properties.brojtelefona,
            brosiguranja: updatedDoktorNode.properties.brosiguranja,
            alergije: updatedDoktorNode.properties.alergije,
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
