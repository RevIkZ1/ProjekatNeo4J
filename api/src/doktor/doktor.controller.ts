import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  NotFoundException,
  Res,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { Doktor, DoktorInput } from './doktor.entity';
import { DoktorService } from './doktor.service';
import { Response } from 'express';

@Controller('doktori')
export class DoktorController {
  constructor(private readonly doktorService: DoktorService) {}

  @Post('addDoktor')
  async createDoktor(@Body() doktorInput: DoktorInput): Promise<Doktor> {
    return this.doktorService.createDoktor(doktorInput);
  }
  @Delete('deleteDoktor/:id')
  async deleteDoktor(@Param('id') id: number): Promise<number> {
    try {
      await this.doktorService.deleteDoktorById(id);
      return 200;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return 404;
      }
      console.error('Greška prilikom brisanja doktora:', error);
      return 500;
    }
  }
  @Get('getAllDoktori')
  async getAllDoktori(@Res() res: Response): Promise<void> {
    try {
      const doktori: Doktor[] = await this.doktorService.getAllDoktori();
      res.status(HttpStatus.OK).json(doktori);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).send();
      } else {
        console.error('Greška prilikom dobijanja svih doktora:', error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }
  @Get('/getdoktoribyustanova/:zdravstvenaUstanovaId')
  async getDoktoriByZdravstvenaUstanovaId(
    @Param('zdravstvenaUstanovaId') zdravstvenaUstanovaId: number,
    @Res() res: Response, // Inject Response into the method
  ): Promise<void> {
    try {
      const doktori: Doktor[] =
        await this.doktorService.getDoktoriByZdravstvenaUstanovaId(
          zdravstvenaUstanovaId,
        );
      res.status(HttpStatus.OK).json(doktori);
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
  @Get('/getdoktor/:id')
  async getDoktorById(@Param('id') id: number): Promise<Doktor | null> {
    try {
      const doktor = await this.doktorService.getDoktorById(id);
      return doktor;
    } catch (error) {
      console.error('Greška prilikom dobijanja doktora po ID-u:', error);
      throw error;
    }
  }
  @Put('updateDoktor/:id')
  async updateDoktor(
    @Param('id') id: number,
    @Body() doktorInput: DoktorInput,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const updatedDoktor: Doktor | null =
        await this.doktorService.updateDoktorById(id, doktorInput);

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
