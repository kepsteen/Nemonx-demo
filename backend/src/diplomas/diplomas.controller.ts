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
@Controller('diplomas')
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
    @Body() diplomaData: Prisma.diplomaUpdateInput,
  ) {
    return this.diplomasService.update(+id, diplomaData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diplomasService.remove(+id);
  }
}
