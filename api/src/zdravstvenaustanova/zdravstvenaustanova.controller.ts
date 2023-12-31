import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { ZdravstvenaustanovaService } from './zdravstvenaustanova.service';
import {
  ZdravstvenaUstanova,
  ZdravstvenaUstanovaInput,
} from './zdravstvenaustanova.entity';
import { Response } from 'express'; // Import Response from express

@Controller('zdravstvenaustanova')
export class ZdravstvenaustanovaController {
  constructor(
    private readonly zdravstvenaustanovaService: ZdravstvenaustanovaService,
  ) {}

  @Post('create')
  async createZdravstvenaUstanova(
    @Body() zdravstvenaUstanovaInput: ZdravstvenaUstanovaInput,
  ) {
    try {
      const zdravstvenaUstanova =
        await this.zdravstvenaustanovaService.createPacijent(
          zdravstvenaUstanovaInput,
        );
      return {
        status: 'success',
        data: zdravstvenaUstanova,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Greška prilikom kreiranja zdravstvene ustanove.',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('getAll')
  async getAllZdravstveneUstanove(@Res() res: Response): Promise<void> {
    try {
      const zdravstveneUstanove: ZdravstvenaUstanova[] =
        await this.zdravstvenaustanovaService.getAllZdravstveneUstanove();

      // Correct usage of status property
      res.status(HttpStatus.OK).json(zdravstveneUstanove);
    } catch (error) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Greška prilikom dobijanja svih zdravstvenih ustanova.',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('/getustanova/:id')
  async getZdravstvenaUstanovaById(
    @Param('id') id: number,
  ): Promise<ZdravstvenaUstanova | null> {
    try {
      const zdravstvenaUstanova =
        await this.zdravstvenaustanovaService.getZdravstvenaUstanovaById(id);
      return zdravstvenaUstanova;
    } catch (error) {
      console.error(
        'Greška prilikom dobijanja zdravstvene ustanove po ID-u:',
        error,
      );
      throw error;
    }
  }
}
