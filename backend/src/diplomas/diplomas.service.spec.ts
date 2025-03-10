import { Test, TestingModule } from '@nestjs/testing';
import { DiplomasService } from './diplomas.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('DiplomasService', () => {
  let service: DiplomasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [DiplomasService],
    }).compile();

    service = module.get<DiplomasService>(DiplomasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
