import {
  Injectable,
  Inject,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminInput } from './admin.entity';
import { Neo4jService } from 'src/neo4j/neo4j.service';

@Injectable()
export class AdminService {
  constructor(
    private jwtService: JwtService,
    private readonly neo4jService: Neo4jService,
  ) {}

  async getAllAdmins(): Promise<Admin[]> {
    const query = `
      MATCH (admin:Admin)
      RETURN admin
    `;
    const result = await this.neo4jService.runQuery(query);
    return result.records.map((record) => record.get('admin').properties);
  }

  async findAdminById(id: number): Promise<Admin | null> {
    const query = `
      MATCH (admin:Admin {id: $id})
      RETURN admin
    `;
    const params = { id };
    const result = await this.neo4jService.runQuery(query, params);

    if (result.records.length === 0) {
      return null;
    }

    return result.records[0].get('admin').properties;
  }

  async addAdmin(admin: Admin): Promise<Admin | null> {
    const existingAdmin = await this.getAdminByUsername(
      admin.username,
      admin.password,
    );

    if (existingAdmin) {
      throw new ConflictException(
        `Admin with username ${admin.username} already exists.`,
      );
    }

    const query = `
      CREATE (admin:Admin $admin)
      RETURN admin
    `;
    const params = { admin };
    const result = await this.neo4jService.runQuery(query, params);

    return result.records[0].get('admin').properties;
  }

  async getAdminByUsername(
    username: string,
    password: string,
  ): Promise<Admin | null> {
    const query = `
      MATCH (admin:Admin {username: $username, password: $password})
      RETURN admin
    `;
    const params = { username, password };
    const result = await this.neo4jService.runQuery(query, params);

    if (result.records.length === 0) {
      return null;
    }

    return result.records[0].get('admin').properties;
  }

  async signIn(loginDto: AdminInput): Promise<string | null> {
    const admin = await this.getAdminByUsername(
      loginDto.username,
      loginDto.password,
    );

    if (!admin) {
      return null;
    }

    const payload = {
      sub: admin.id, // Adjust based on your Admin entity structure
      username: admin.username,
      password: admin.password,
    };
    const jwt = await this.jwtService.signAsync(payload);
    return jwt;
  }

  async getAdminByAdmin(username: string): Promise<Admin | null> {
    const query = `
      MATCH (admin:Admin {username: $username})
      RETURN admin
    `;
    const params = { username };
    const result = await this.neo4jService.runQuery(query, params);

    if (result.records.length === 0) {
      return null;
    }

    return result.records[0].get('admin').properties;
  }
}
