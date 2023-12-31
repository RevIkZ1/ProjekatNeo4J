import {
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {}
