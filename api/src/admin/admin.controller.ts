import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Res,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminInput } from './admin.entity';
import { LoggedGuard } from 'src/guards/logged.guard';
import { AdminService } from './admin.service';
import { Response, Request } from 'express';

@Controller('Admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  @Post('addAdmin')
  async addAdmin(@Body() user: Admin): Promise<Admin> {
    return this.adminService.addAdmin(user);
  }

  @Get('getUser')
  async getUser(): Promise<Admin[]> {
    return this.adminService.getAllAdmins();
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDTO: AdminInput,
  ) {
    const token = await this.adminService.signIn(loginDTO);
    response.cookie('jwt', token, { httpOnly: true });
    console.log('nesto');
    let user = await this.adminService.getAdminByUsername(
      loginDTO.username,
      loginDTO.password,
    );
    console.log(user);
    const { password, ...result } = user;
    return result;
  }
  @Get('getLoggedUser')
  async getLoggedUser(@Req() request: Request) {
    try {
      console.log('Perica');
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      console.log(data);
      const userr = await this.adminService.getAdminByUsername(
        data['username'],
        data['password'],
      );
      console.log(userr);
      const { password, ...result } = userr;
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }
  @Get('getUserWithId/:userId')
  @UseGuards(LoggedGuard)
  async getUserWithId(@Param('userId') userId: number) {
    const user = await this.adminService.findAdminById(userId);
    return user;
  }
  @Get('getUserByUsername/:username')
  async getUserByUsername(@Param('username') username: string) {
    return this.adminService.getAdminByAdmin(username);
  }
}
