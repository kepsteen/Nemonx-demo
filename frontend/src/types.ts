import { z } from 'zod';

export const studentSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  ssn: z.string().length(4),
  email: z.string().email(),
  phone: z.string().length(10),
  created_at: z.string(),
  updated_at: z.string(),
});

export const diplomaSchema = z.object({
  id: z.number().optional(),
  student_id: z.string().uuid(),
  degree: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  status: z.enum(['pending', 'processing', 'success', 'failed']),
  student: studentSchema.optional(),
});

export type Student = z.infer<typeof studentSchema>;
export type Diploma = z.infer<typeof diplomaSchema>;
