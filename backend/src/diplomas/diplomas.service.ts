import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, diploma } from '@prisma/client';

@Injectable()
export class DiplomasService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<diploma[]> {
    return this.prisma.diploma.findMany();
  }

  async create(data: Prisma.diplomaCreateInput): Promise<diploma> {
    return this.prisma.diploma.create({ data });
  }

  async findOne(id: number): Promise<diploma | null> {
    return this.prisma.diploma.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.diplomaUpdateInput): Promise<diploma> {
    return this.prisma.diploma.update({ where: { id }, data });
  }

  async remove(id: number): Promise<diploma> {
    return this.prisma.diploma.delete({ where: { id } });
  }
}
