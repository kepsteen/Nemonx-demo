import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { DialogContent, DialogHeader } from '../ui/dialog';
import { addDiploma, getStudentBySsn } from '@/lib/api';
import { useState } from 'react';
import { Student } from '@/types';
import { Label } from '../ui/label';
export function AddDiplomaModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [ssn, setSsn] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [degree, setDegree] = useState('');

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    setSsn('');
    setStudent(null);
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Which student?</DialogTitle>
          <DialogDescription>
            Enter the SSN of the student you want to add a diploma to.
          </DialogDescription>
        </DialogHeader>
        {student === null && (
          <>
            <Input
              type="text"
              placeholder="SSN"
              value={ssn}
              onChange={(e) => {
                setSsn(e.target.value);
                setError(null);
              }}
            />
            <Button
              onClick={() => {
                getStudentBySsn(ssn).then((student) => {
                  if (student.error) {
                    setError(student.error);
                  } else {
                    setStudent(student.data);
                  }
                });
              }}
            >
              Search
            </Button>
          </>
        )}
        {student !== null && (
          <>
            <p>{student.name}</p>
            <p>{student.email}</p>
            <Label>Degree</Label>
            <Input
              type="text"
              placeholder="Degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
            <Button
              onClick={() => {
                addDiploma({
                  student_id: student.id,
                  degree: degree,
                  status: 'pending',
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                });
                setOpen(false);
                window.location.reload();
              }}
            >
              Add Diploma
            </Button>
          </>
        )}
        {error && (
          <p className="text-red-500 text-sm">
            No Student Found with SSN: {ssn}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
