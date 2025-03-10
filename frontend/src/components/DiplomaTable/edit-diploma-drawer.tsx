import { Button } from '../ui/button';
import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
  Drawer,
} from '../ui/drawer';
import {
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Diploma } from '@/types';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from '../ui/select';
import { formatPhoneNumber, stripCharacters } from '@/lib/utils';
import { updateDiploma } from '@/lib/api';
import { useEffect, useState } from 'react';

const editDiplomaSchema = z.object({
  degree: z.string(),
  status: z.enum(['pending', 'processing', 'success', 'failed']),
  studentName: z.string().min(1, 'Student name is required'),
  studentSsn: z.string().length(4, 'SSN must be exactly 4 digits'),
  studentEmail: z.string().email('Please enter a valid email address'),
  studentPhone: z.string().refine((val) => stripCharacters(val).length === 10, {
    message: 'Phone number must be exactly 10 digits',
  }),
});

interface EditDiplomaDrawerProps {
  data: Diploma;
  refreshData: () => void;
}

export const EditDiplomaDrawer = ({
  data,
  refreshData,
}: EditDiplomaDrawerProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof editDiplomaSchema>>({
    resolver: zodResolver(editDiplomaSchema),
    mode: 'onChange',
    defaultValues: {
      degree: data.degree,
      status: data.status,
      studentName: data.student?.name,
      studentSsn: data.student?.ssn?.toString(),
      studentEmail: data.student?.email,
      studentPhone: formatPhoneNumber(data.student?.phone || ''),
    },
  });

  useEffect(() => {
    form.reset({
      degree: data.degree,
      status: data.status,
      studentName: data.student?.name,
      studentSsn: data.student?.ssn?.toString(),
      studentEmail: data.student?.email,
      studentPhone: formatPhoneNumber(data.student?.phone || ''),
    });
  }, [data, form]);

  async function onSubmit(values: z.infer<typeof editDiplomaSchema>) {
    const formattedValues = {
      id: data.id,
      student_id: data.student_id,
      degree: values.degree,
      status: values.status,
      created_at: data.created_at,
      updated_at: new Date().toISOString(),
      student: {
        id: data.student_id,
        name: values.studentName,
        ssn: values.studentSsn,
        email: values.studentEmail,
        phone: stripCharacters(values.studentPhone),
        created_at: data.student?.created_at as string,
        updated_at: new Date().toISOString(),
      },
    };
    await updateDiploma({
      diploma: formattedValues,
      id: data.id?.toString() || '',
    });
    form.reset();
    refreshData();
    setOpen(false);
  }

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button variant="secondary">Edit</Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle>Edit Diploma</DrawerTitle>
          <DrawerDescription>
            Edit the details of the diploma.
          </DrawerDescription>
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
                    <Input
                      {...field}
                      type="text"
                      maxLength={4}
                      onChange={(e) => {
                        const formattedValue = stripCharacters(e.target.value);
                        field.onChange(formattedValue);
                      }}
                    />
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
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
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
                    <Input
                      {...field}
                      onChange={(e) => {
                        const formattedValue = formatPhoneNumber(
                          e.target.value,
                        );
                        field.onChange(formattedValue);
                      }}
                      placeholder="(123) 456-7890"
                    />
                  </FormControl>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
            <div className="flex justify-center gap-2 mt-6">
              <DrawerClose
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
              >
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
