import {
  Controller,
  Post,
  Body,
  Delete,
  NotFoundException,
  Get,
  Param,
} from '@nestjs/common';
import { Recept, ReceptInput } from './recept.entity';
import { ReceptService } from './recept.service';

@Controller('recept')
export class ReceptController {
  constructor(private readonly receptService: ReceptService) {}

  @Post('addRecept')
  async createRecept(@Body() receptInput: ReceptInput): Promise<Recept> {
    return this.receptService.createRecept(receptInput);
  }
  @Delete('deleteRecept/:id1')
  async deleteRecept(@Param('id1') id1: number): Promise<number> {
    try {
      console.log(id1);
      await this.receptService.deleteReceptById(id1);
      return 200;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return 404;
      }
      console.error('Greška prilikom brisanja recept', error);
      return 500;
    }
  }
  @Get('getRecepti/:receptId')
  async getPreglediByDoktorId(
    @Param('receptId') receptId: number,
  ): Promise<Recept[]> {
    try {
      const recepti = await this.receptService.getReceptiByPacijentId(receptId);
      return recepti;
    } catch (error) {
      console.error('Greška prilikom dobijanja pregleda za doktora:', error);
      return [];
    }
  }
}
