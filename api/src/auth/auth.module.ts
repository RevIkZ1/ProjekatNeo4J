import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './LocalStrategy';
import { JwtModule } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { AuthController } from './auth.controller';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
@Module({
  imports: [Neo4jModule, PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: AdminService,
    },
    LocalStrategy,
  ],
})
export class AuthModule {}
