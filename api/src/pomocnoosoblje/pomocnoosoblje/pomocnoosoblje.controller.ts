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
} from '@nestjs/common';
import { PomocnoosobljeService } from './pomocnoosoblje.service';
import { Pomocnoosoblje, PomocnoosobljeInput } from './pomocnoosoblje.entity';
import { Response } from 'express';

@Controller('pomocnoosoblje')
export class PomocnoosobljeController {
  constructor(private readonly pomocnoosobljeService: PomocnoosobljeService) {}

  @Post('addOsoblje')
  async createOsoblje(
    @Body() pomocnoosobljeInput: PomocnoosobljeInput,
  ): Promise<Pomocnoosoblje> {
    return this.pomocnoosobljeService.createOsoblje(pomocnoosobljeInput);
  }
  @Delete('deleteOsoblje')
  async deleteOsoblje(@Body('id') id: number): Promise<number> {
    try {
      await this.pomocnoosobljeService.deleteOsobljeById(id);
      return 200;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return 404;
      }
      console.error('Greška prilikom brisanja osoblje:', error);
      return 500;
    }
  }
  @Get('/getpomocnoosobljebyustanova/:zdravstvenaUstanovaId')
  async getDoktoriByZdravstvenaUstanovaId(
    @Param('zdravstvenaUstanovaId') zdravstvenaUstanovaId: number,
    @Res() res: Response, // Inject Response into the method
  ): Promise<void> {
    try {
      const lekovi: Pomocnoosoblje[] =
        await this.pomocnoosobljeService.getPomocnoOsobljeByZdravstvenaUstanovaId(
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
