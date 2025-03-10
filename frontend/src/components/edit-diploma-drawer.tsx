import { Button } from './ui/button';
import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Drawer,
} from './ui/drawer';
import {
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Form } from './ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from './ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { iDiploma } from '@/types';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from './ui/select';
const editDiplomaSchema = z.object({
  degree: z.string(),
  status: z.enum(['pending', 'processing', 'success', 'failed']),
  studentName: z.string().min(1, 'Student name is required'),
  studentSsn: z.string().length(4, 'SSN must be exactly 4 digits'),
  studentEmail: z.string().email('Please enter a valid email address'),
  studentPhone: z.string().length(10, 'Phone number must be exactly 10 digits'),
});

export const EditDiplomaDrawer = ({ data }: { data: iDiploma }) => {
  const form = useForm<z.infer<typeof editDiplomaSchema>>({
    resolver: zodResolver(editDiplomaSchema),
    mode: 'onChange',
    defaultValues: {
      degree: data.degree,
      status: data.status,
      studentName: data.student?.name,
      studentSsn: data.student?.ssn?.toString(),
      studentEmail: data.student?.email,
      studentPhone: data.student?.phone,
    },
  });

  function onSubmit(values: z.infer<typeof editDiplomaSchema>) {
    console.log(values);
  }
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <Button variant="secondary">Edit</Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle>Edit Diploma Details</DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentSsn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student SSN (last 4 digits)</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" maxLength={4} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-2 mt-6">
              <DrawerClose>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DrawerClose>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
