import { Test, TestingModule } from '@nestjs/testing';
import { DiplomasController } from './diplomas.controller';
import { DiplomasService } from './diplomas.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('DiplomasController', () => {
  let controller: DiplomasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [DiplomasController],
      providers: [DiplomasService],
    }).compile();

    controller = module.get<DiplomasController>(DiplomasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
