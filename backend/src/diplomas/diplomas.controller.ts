import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiplomasService } from './diplomas.service';
import { Prisma } from '@prisma/client';
import { UpdateWithStudentDto } from './dto';

@Controller('/api/diplomas')
export class DiplomasController {
  constructor(private readonly diplomasService: DiplomasService) {}

  @Post()
  create(@Body() diplomaData: Prisma.diplomaCreateInput) {
    return this.diplomasService.create(diplomaData);
  }

  @Get()
  findAll() {
    return this.diplomasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diplomasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() diplomaData: Prisma.diplomaCreateManyStudentInput,
  ) {
    return this.diplomasService.update(+id, diplomaData);
  }

  @Patch(':id/with-student')
  updateWithStudent(
    @Param('id') id: string,
    @Body() data: UpdateWithStudentDto,
  ) {
    console.log('data', data);

    const diplomaData: Prisma.diplomaUpdateInput = {
      degree: data.degree,
      status: data.status,
    };

    const studentData: Prisma.studentUpdateInput = data.student;

    return this.diplomasService.updateWithStudent(
      +id,
      diplomaData,
      studentData,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diplomasService.remove(+id);
  }
}
