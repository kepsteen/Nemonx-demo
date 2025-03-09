import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, student } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.studentCreateInput): Promise<student> {
    return this.prisma.student.create({ data });
  }

  async findAll(): Promise<student[]> {
    return this.prisma.student.findMany();
  }

  async findOne(id: string): Promise<student | null> {
    return this.prisma.student.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.studentUpdateInput): Promise<student> {
    return this.prisma.student.update({ where: { id }, data });
  }

  async remove(id: string): Promise<student> {
    return this.prisma.student.delete({ where: { id } });
  }
}
