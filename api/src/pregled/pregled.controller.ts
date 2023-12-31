import {
  Controller,
  Post,
  Body,
  Delete,
  NotFoundException,
  Param,
  Get,
} from '@nestjs/common';
import { Pregled, PregledInput } from './pregled.entity';
import { PregledService } from './pregled.service';

@Controller('pregled')
export class PregledController {
  constructor(private readonly pregledService: PregledService) {}

  @Post('addPregled')
  async createPregled(@Body() pregledInput: PregledInput): Promise<Pregled> {
    return this.pregledService.createPregled(pregledInput);
  }
  @Delete('deletePregled/:id')
  async deletePacijent(@Param('id') id: number): Promise<number> {
    try {
      await this.pregledService.deletePregledById(id);
      return 200;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return 404;
      }
      console.error('Greška prilikom brisanja pregled:', error);
      return 500;
    }
  }
  @Get('getPregledi/:doktorId')
  async getPreglediByDoktorId(
    @Param('doktorId') doktorId: number,
  ): Promise<Pregled[]> {
    try {
      const pregledi =
        await this.pregledService.getPreglediByDoktorId(doktorId);
      return pregledi;
    } catch (error) {
      console.error('Greška prilikom dobijanja pregleda za doktora:', error);
      return [];
    }
  }
}
