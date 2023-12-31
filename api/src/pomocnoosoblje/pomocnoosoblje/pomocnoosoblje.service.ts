import { Injectable, NotFoundException } from '@nestjs/common';
import { Record, QueryResult, Node } from 'neo4j-driver';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { Pomocnoosoblje, PomocnoosobljeInput } from './pomocnoosoblje.entity';
interface Neo4jPomocnoOsobljeRecord extends Record {
  pomocnoosoblje?: Node;
}
@Injectable()
export class PomocnoosobljeService {
  constructor(private readonly neo4jService: Neo4jService) {}
  async createOsoblje(
    pomocnoosobljeInput: PomocnoosobljeInput,
  ): Promise<Pomocnoosoblje> {
    try {
      const {
        ime,
        prezime,
        uloga,
        brojtelefona,
        radnomesto,
        email,
        zdravstvenaUstanovaId,
      } = pomocnoosobljeInput;

      const result: QueryResult = await this.neo4jService.write(
        `MATCH (z:ZdravstvenaUstanova)
         WHERE ID(z) = $zdravstvenaUstanovaId
         CREATE (pomocnoosoblje:Pomocnoosoblje {ime: $ime, prezime: $prezime, uloga: $uloga, brojtelefona: $brojtelefona, radnomesto: $radnomesto, email: $email})
         CREATE (pomocnoosoblje)-[:PRIPADA]->(z)
         RETURN pomocnoosoblje`,
        {
          ime,
          prezime,
          uloga,
          brojtelefona,
          radnomesto,
          email,
          zdravstvenaUstanovaId,
        },
      );

      if (result?.records?.length > 0) {
        const pomocnoosobljeRecord: Neo4jPomocnoOsobljeRecord = result
          .records[0] as Neo4jPomocnoOsobljeRecord;

        // Pokušajte pristupiti podacima putem metode get
        const pomocnoosobljeNode: Node | undefined =
          pomocnoosobljeRecord?.get('pomocnoosoblje');

        if (pomocnoosobljeNode) {
          const pomocnoosoblje: Pomocnoosoblje = {
            id: pomocnoosobljeNode.identity.toNumber(),
            ime: pomocnoosobljeNode.properties.ime,
            prezime: pomocnoosobljeNode.properties.prezime,
            uloga: pomocnoosobljeNode.properties.specijalizacija,
            brojtelefona: pomocnoosobljeNode.properties.brojtelefona,
            radnomesto: pomocnoosobljeNode.properties.ordinacija,
            email: pomocnoosobljeNode.properties.email,
            zdravstvenaUstanovaId:
              pomocnoosobljeNode.properties.zdravstvenaUstanovaId,
          };
          return pomocnoosoblje;
        } else {
          console.error(
            'Neo4j rezultat nema očekivane podatke o pomocnom osoblju:',
            result,
          );
          throw new Error('Nije moguće dobiti podatke o pomocnom osoblju.');
        }
      } else {
        console.error('Neo4j rezultat nije sadržao očekivane zapise:', result);
        throw new Error('Nema podataka u rezultatu.');
      }
    } catch (error) {
      console.error('Greška prilikom kreiranja pomocno osoblje:', error);
      throw error;
    }
  }
  async deleteOsobljeById(id1: number): Promise<void> {
    try {
      var id = id1;
      console.log(id1);
      const result: QueryResult = await this.neo4jService.write(
        `MATCH (pomocnoosoblje:Pomocnoosoblje) WHERE ID(pomocnoosoblje) = $id DELETE pomocnoosoblje`,
        { id }, // Prosleđujemo direktno vrednost ID-ja
      );
      console.log(result, 'AAAAAAAAAAAAAAAAAAA');
      if (!result || result.records.length === 0) {
        throw new NotFoundException(`Pomocnoosoblje with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Greška prilikom brisanja doktor:', error);
      throw error;
    }
  }
  async getPomocnoOsobljeByZdravstvenaUstanovaId(
    zdravstvenaUstanovaId: number,
  ): Promise<Pomocnoosoblje[]> {
    try {
      const nesto = zdravstvenaUstanovaId;
      const result: QueryResult = await this.neo4jService.read(
        `MATCH (pomocnoosoblje:Pomocnoosoblje)-[:PRIPADA]->(z:ZdravstvenaUstanova)
         WHERE ID(z) = ${nesto}
         RETURN pomocnoosoblje`,
        { nesto },
      );
      console.log(
        'Searching for doctors with health institution ID:',
        zdravstvenaUstanovaId,
      );

      console.log('Query result:', result);
      if (result?.records?.length > 0) {
        const pomocnoosoblje: Pomocnoosoblje[] = result.records.map(
          (record: Neo4jPomocnoOsobljeRecord) => {
            const pomocnoosobljeNode: Node | undefined =
              record?.get('pomocnoosoblje');

            if (pomocnoosobljeNode) {
              return {
                id: pomocnoosobljeNode.identity.toNumber(),
                ime: pomocnoosobljeNode.properties.ime,
                prezime: pomocnoosobljeNode.properties.prezime,
                uloga: pomocnoosobljeNode.properties.uloga,
                brojtelefona: pomocnoosobljeNode.properties.brojtelefona,
                radnomesto: pomocnoosobljeNode.properties.radnomesto,
                email: pomocnoosobljeNode.properties.email,
                zdravstvenaUstanovaId:
                  pomocnoosobljeNode.properties.zdravstvenaUstanovaId,
              };
            } else {
              console.error(
                'Neo4j rezultat nema očekivane podatke o lek:',
                result,
              );
              throw new Error('Nije moguće dobiti podatke o lek.');
            }
          },
        );
        return pomocnoosoblje;
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
