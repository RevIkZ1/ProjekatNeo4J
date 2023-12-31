import {
  Controller,
  Post,
  Body,
  Delete,
  NotFoundException,
  Get,
  Param,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { PacijentService } from './pacijent.service';
import { Pacijent, PacijentInput } from './pacijent.entity';
import { Response } from 'express';

@Controller('pacijenti')
export class PacijentController {
  constructor(private readonly pacijentService: PacijentService) {}

  @Post('addPacijent')
  async createPacijent(
    @Body() pacijentInput: PacijentInput,
  ): Promise<Pacijent> {
    return this.pacijentService.createPacijent(pacijentInput);
  }
  @Delete('deletePacijent/:id')
  async deletePacijent(@Param('id') id: number): Promise<number> {
    try {
      await this.pacijentService.deletePacijentById(id);
      return 200; // Uspješno brisanje
    } catch (error) {
      if (error instanceof NotFoundException) {
        return 404;
      }
      console.error('Greška prilikom brisanja pacijenta:', error);
      return 500;
    }
  }
  @Get('/getpacijentbyustanova/:zdravstvenaUstanovaId')
  async getDoktoriByZdravstvenaUstanovaId(
    @Param('zdravstvenaUstanovaId') zdravstvenaUstanovaId: number,
    @Res() res: Response, // Inject Response into the method
  ): Promise<void> {
    try {
      const pacijenti: Pacijent[] =
        await this.pacijentService.getPacijentByZdravstvenaUstanovaId(
          zdravstvenaUstanovaId,
        );
      res.status(HttpStatus.OK).json(pacijenti);
    } catch (error) {
      console.error(
        'Greška prilikom dobijanja doktora po zdravstvenoj ustanovi:',
        error,
      );
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
  @Get('/getPacijentByPregledId/:pregledId')
  async getPacijentByPregledId(
    @Param('pregledId') pregledId: number,
    @Res() res: Response, // Inject Response into the method
  ): Promise<void> {
    try {
      const pacijent: Pacijent | null =
        await this.pacijentService.getPacijentByPregledId(pregledId);
      if (pacijent) {
        res.status(HttpStatus.OK).json(pacijent);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Pacijent not found for given pregledId' });
      }
    } catch (error) {
      console.error(
        'Greška prilikom dobijanja pacijenta po ID pregleda:',
        error,
      );
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
  @Get('/getpacijent/:id')
  async getDoktorById(@Param('id') id: number): Promise<Pacijent | null> {
    try {
      const pacijent = await this.pacijentService.getPacijentById(id);
      return pacijent;
    } catch (error) {
      console.error('Greška prilikom dobijanja pacijent po ID-u:', error);
      throw error;
    }
  }
  @Put('updateDoktor/:id')
  async updateDoktor(
    @Param('id') id: number,
    @Body() doktorInput: PacijentInput,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const updatedDoktor: Pacijent | null =
        await this.pacijentService.updatePacijentById(id, doktorInput);

      if (updatedDoktor) {
        res.status(HttpStatus.OK).json(updatedDoktor);
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: `Doktor with ID ${id} not found` });
      }
    } catch (error) {
      console.error('Greška prilikom ažuriranja doktora:', error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
}
