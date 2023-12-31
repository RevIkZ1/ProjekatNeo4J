import { Injectable, NotFoundException } from '@nestjs/common';
import { Record, QueryResult, Node } from 'neo4j-driver';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { Recept, ReceptInput } from './recept.entity';

interface Neo4jReceptRecord extends Record {
  recept?: Node; // Može biti opcionalan
}

@Injectable()
export class ReceptService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async createRecept(receptInput: ReceptInput): Promise<Recept> {
    try {
      const {
        datumivremeizdavanja,
        dnevnadoza,
        nazivleka,
        kakouzimati,
        pacijentId,
        doktorId,
      } = receptInput;
      console.log(receptInput, 'UKILA');
      const result: QueryResult = await this.neo4jService.write(
        `MATCH (p:Pacijent)
             WHERE ID(p) = $pacijentId
             MATCH (d:Doktor)
             WHERE ID(d) = $doktorId
             CREATE (recept:Recept {datumivremeizdavanja: $datumivremeizdavanja, dnevnadoza: $dnevnadoza, nazivleka: $nazivleka, kakouzimati: $kakouzimati})
             CREATE (recept)-[:PRIPADA]->(p)  
             CREATE (recept)-[:PRIPADA]->(d)  
             RETURN recept`,
        {
          datumivremeizdavanja,
          dnevnadoza,
          nazivleka,
          kakouzimati,
          pacijentId,
          doktorId,
        },
      );

      if (result?.records?.length > 0) {
        const receptRecord: Neo4jReceptRecord = result
          .records[0] as Neo4jReceptRecord;

        // Pokušajte pristupiti podacima putem metode get
        const receptNode: Node | undefined = receptRecord?.get('recept');

        if (receptNode) {
          const recept: Recept = {
            id: receptNode.identity.toNumber(),
            datumivremeizdavanja: receptNode.properties.datumivremeizdavanja,
            dnevnadoza: receptNode.properties.dnevnadoza,
            nazivleka: receptNode.properties.nazivleka,
            kakouzimati: receptNode.properties.kakouzimati,
            pacijentId: receptNode.properties.pacijentId,
            doktorId: receptNode.properties.doktorId,
          };
          return recept;
        } else {
          console.error(
            'Neo4j rezultat nema očekivane podatke o receptu:',
            result,
          );
          throw new Error('Nije moguće dobiti podatke o receptu.');
        }
      } else {
        console.error('Neo4j rezultat nije sadržao očekivane zapise:', result);
        throw new Error('Nema podataka u rezultatu.');
      }
    } catch (error) {
      console.error('Greška prilikom kreiranja recepta:', error);
      throw error;
    }
  }
  async deleteReceptById(id1: number): Promise<void> {
    try {
      var id = id1;
      const result: QueryResult = await this.neo4jService.write(
        `MATCH (recept:Recept) WHERE ID(recept) = $id DELETE recept`,
        { id },
      );
      if (!result || result.records.length === 0) {
        throw new NotFoundException(`Recept with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Greška prilikom brisanja recept:', error);
      throw error;
    }
  }
  async getReceptiByPacijentId(doktorId: number): Promise<Recept[]> {
    try {
      const nesto = doktorId;
      const result: QueryResult = await this.neo4jService.read(
        `MATCH (recept:Recept)-[:PRIPADA]->(z:Pacijent)
         WHERE ID(z) = ${nesto}
         RETURN recept`,
        { nesto },
      );
      console.log(result);
      const recepti: Recept[] = [];
      result.records.forEach((record) => {
        const receptRecord: Neo4jReceptRecord = record as Neo4jReceptRecord;
        const receptNode: Node | undefined = receptRecord?.get('recept');
        console.log(receptNode);
        if (receptNode) {
          const recept: Recept = {
            id: receptNode.identity.toNumber(),
            datumivremeizdavanja: receptNode.properties.datumivreme,
            dnevnadoza: receptNode.properties.dnevnadoza,
            nazivleka: receptNode.properties.nazivleka,
            kakouzimati: receptNode.properties.kakouzimati,
            pacijentId: receptNode.properties.pacijentId,
            doktorId: receptNode.properties.doktorId,
          };

          recepti.push(recept);
        } else {
          console.error(
            'Neo4j rezultat nema očekivane podatke o pregledu:',
            result,
          );
          throw new Error('Nije moguće dobiti podatke o pregledu.');
        }
      });

      return recepti;
    } catch (error) {
      console.error('Greška prilikom pretrage pregleda po ID doktora:', error);
      throw error;
    }
  }
}
