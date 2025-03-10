import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, diploma } from '@prisma/client';

@Injectable()
export class DiplomasService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<diploma[]> {
    return this.prisma.diploma.findMany({
      include: {
        student: true,
      },
    });
  }

  async create(data: Prisma.diplomaCreateInput): Promise<diploma> {
    return this.prisma.diploma.create({ data });
  }

  async findOne(id: number): Promise<diploma | null> {
    return this.prisma.diploma.findUnique({
      where: { id },
      include: {
        student: true,
      },
    });
  }

  async update(id: number, data: Prisma.diplomaUpdateInput): Promise<diploma> {
    return this.prisma.diploma.update({
      where: { id },
      data,
      include: {
        student: true,
      },
    });
  }

  async updateWithStudent(
    id: number,
    diplomaData: Prisma.diplomaUpdateInput,
    studentData: Prisma.studentUpdateInput,
  ): Promise<diploma> {
    const diploma = await this.prisma.diploma.findUnique({
      where: { id },
    });
    if (!diploma) {
      throw new NotFoundException('Diploma not found');
    }
    console.log('diplomaData', diplomaData);
    return this.prisma.diploma.update({
      where: { id },
      data: {
        ...diplomaData,
        student: {
          update: {
            where: { id: diploma.student_id },
            data: studentData,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<diploma> {
    return this.prisma.diploma.delete({ where: { id } });
  }
}
