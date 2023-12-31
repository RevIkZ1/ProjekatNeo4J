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
import { LekService } from './lek.service';
import { Lek, LekInput } from './lek.entity';
import { Response } from 'express';

@Controller('lekovi')
export class LekController {
  constructor(private readonly lekService: LekService) {}

  @Post('addLek')
  async createLekovi(@Body() lekInput: LekInput): Promise<Lek> {
    return this.lekService.createLek(lekInput);
  }
  @Put('uzmiLek')
  async uzmiLek(
    @Body() body: { id: number; kolicina: number; naziv: string },
    @Res() res: Response<{ data?: Lek; errorMessage?: string }>,
  ): Promise<void> {
    try {
      console.log('HAHA', body.id, body.kolicina, body.naziv, 'HAHA');
      const updatedLek = await this.lekService.uzmiLek(
        body.id,
        body.kolicina,
        body.naziv,
      );
      res.status(HttpStatus.OK).json({ data: updatedLek });
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).json({ errorMessage: error.message });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ errorMessage: 'Internal Server Error' });
      }
    }
  }
  @Get('/getlekbyustanova/:zdravstvenaUstanovaId')
  async getDoktoriByZdravstvenaUstanovaId(
    @Param('zdravstvenaUstanovaId') zdravstvenaUstanovaId: number,
    @Res() res: Response, // Inject Response into the method
  ): Promise<void> {
    try {
      const lekovi: Lek[] = await this.lekService.getLekByZdravstvenaUstanovaId(
        zdravstvenaUstanovaId,
      );
      res.status(HttpStatus.OK).json(lekovi);
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
}
