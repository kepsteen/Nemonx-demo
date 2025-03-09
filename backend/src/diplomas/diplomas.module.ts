import { Module } from '@nestjs/common';
import { DiplomasService } from './diplomas.service';
import { DiplomasController } from './diplomas.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DiplomasController],
  providers: [DiplomasService],
})
export class DiplomasModule {}
