import { Prisma } from '@prisma/client';

export class UpdateWithStudentDto {
  degree: string;
  status: string;
  student: Prisma.studentUpdateInput;
}
