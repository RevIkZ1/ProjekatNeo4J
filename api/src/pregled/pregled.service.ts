import { Injectable, NotFoundException } from '@nestjs/common';
import { Record, QueryResult, Node } from 'neo4j-driver';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { Pregled, PregledInput } from './pregled.entity';

interface Neo4jPregledRecord extends Record {
  pregled?: Node; // Može biti opcionalan
}

@Injectable()
export class PregledService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async createPregled(pregledInput: PregledInput): Promise<Pregled> {
    try {
      const { datumivreme, tip, dijagnoza, preporuke, pacijentId, doktorId } =
        pregledInput;

      const result: QueryResult = await this.neo4jService.write(
        `MATCH (p:Pacijent)
             WHERE ID(p) = $pacijentId
             MATCH (d:Doktor)
             WHERE ID(d) = $doktorId
             CREATE (pregled:Pregled {datumivreme: $datumivreme, tip: $tip, dijagnoza: $dijagnoza, preporuke: $preporuke})
             CREATE (pregled)-[:PRIPADA]->(p)  
             CREATE (pregled)-[:PRIPADA]->(d)  
             RETURN pregled`,
        {
          datumivreme,
          tip,
          dijagnoza,
          preporuke,
          pacijentId,
          doktorId,
        },
      );

      if (result?.records?.length > 0) {
        const pregledRecord: Neo4jPregledRecord = result
          .records[0] as Neo4jPregledRecord;

        // Pokušajte pristupiti podacima putem metode get
        const pregledNode: Node | undefined = pregledRecord?.get('pregled');

        if (pregledNode) {
          const pregled: Pregled = {
            id: pregledNode.identity.toNumber(),
            datumivreme: pregledNode.properties.datumivreme,
            tip: pregledNode.properties.tip,
            dijagnoza: pregledNode.properties.dijagnoza,
            preporuke: pregledNode.properties.preporuke,
            pacijentId: pregledNode.properties.pacijentId,
            doktorId: pregledNode.properties.doktorId,
          };
          return pregled;
        } else {
          console.error(
            'Neo4j rezultat nema očekivane podatke o pregledu:',
            result,
          );
          throw new Error('Nije moguće dobiti podatke o pregledu.');
        }
      } else {
        console.error('Neo4j rezultat nije sadržao očekivane zapise:', result);
        throw new Error('Nema podataka u rezultatu.');
      }
    } catch (error) {
      console.error('Greška prilikom kreiranja pregleda:', error);
      throw error;
    }
  }
  async deletePregledById(id1: number): Promise<void> {
    try {
      var id = id1;
      console.log(id1);

      const deleteRelationshipsResult: QueryResult =
        await this.neo4jService.write(
          `MATCH (pregled:Pregled)-[r]-() WHERE ID(pregled) = ${id} DELETE r`,
          {},
        );

      if (
        !deleteRelationshipsResult ||
        deleteRelationshipsResult.records.length === 0
      ) {
        throw new NotFoundException(
          `Relationships for Pregled with ID ${id} not found`,
        );
      }

      const deletePregledResult: QueryResult = await this.neo4jService.write(
        `MATCH (pregled:Pregled) WHERE ID(pregled) = ${id} DELETE pregled`,
        {},
      );

      if (!deletePregledResult || deletePregledResult.records.length === 0) {
        throw new NotFoundException(`Pregled with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Greška prilikom brisanja pregled:', error);
      throw error;
    }
  }
  async getPreglediByDoktorId(doktorId: number): Promise<Pregled[]> {
    try {
      const nesto = doktorId;
      const result: QueryResult = await this.neo4jService.read(
        `MATCH (pregled:Pregled)-[:PRIPADA]->(z:Doktor)
         WHERE ID(z) = ${nesto}
         RETURN pregled`,
        { nesto },
      );
      console.log(result);
      const pregledi: Pregled[] = [];
      result.records.forEach((record) => {
        const pregledRecord: Neo4jPregledRecord = record as Neo4jPregledRecord;
        const pregledNode: Node | undefined = pregledRecord?.get('pregled');
        console.log(pregledNode);
        if (pregledNode) {
          const pregled: Pregled = {
            id: pregledNode.identity.toNumber(),
            datumivreme: pregledNode.properties.datumivreme,
            tip: pregledNode.properties.tip,
            dijagnoza: pregledNode.properties.dijagnoza,
            preporuke: pregledNode.properties.preporuke,
            pacijentId: pregledNode.properties.pacijentId,
            doktorId: pregledNode.properties.doktorId,
          };

          pregledi.push(pregled);
        } else {
          console.error(
            'Neo4j rezultat nema očekivane podatke o pregledu:',
            result,
          );
          throw new Error('Nije moguće dobiti podatke o pregledu.');
        }
      });

      return pregledi;
    } catch (error) {
      console.error('Greška prilikom pretrage pregleda po ID doktora:', error);
      throw error;
    }
  }
}
