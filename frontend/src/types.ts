import { z } from 'zod';

export const studentSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  ssn: z.number().min(4).max(4),
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  created_at: z.string(),
  updated_at: z.string(),
});

export const diplomaSchema = z.object({
  id: z.number(),
  student_id: z.string().uuid(),
  degree: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  status: z.enum(['pending', 'processing', 'success', 'failed']),
  student: studentSchema.optional(),
});

export type iStudent = z.infer<typeof studentSchema>;
export type iDiploma = z.infer<typeof diplomaSchema>;
