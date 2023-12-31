import { Inject, Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly adminService: AdminService,
  ) {}
  async validateUser(username: string, password: string) {
    const userr = await this.adminService.getAdminByUsername(
      username,
      password,
    );
    if (userr && (await bcrypt.compare(password, userr.password))) {
      return userr;
    }
  }
}
