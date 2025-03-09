import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, diploma } from '@prisma/client';

@Injectable()
export class DiplomasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<diploma[]> {
    return this.prisma.diploma.findMany();
  }

  async create(data: Prisma.diplomaCreateInput): Promise<diploma> {
    return this.prisma.diploma.create({ data });
  }

  findOne(id: string) {
    return `This action returns a #${id} diploma`;
  }

  update(id: number) {
    return `This action updates a #${id} diploma`;
  }

  remove(id: number) {
    return `This action removes a #${id} diploma`;
  }
}
