import { Diploma } from '@/types';

export async function updateDiploma({
  diploma,
  id,
}: {
  diploma: Diploma;
  id: string;
}) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/diplomas/${id}/with-student`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diploma),
      },
    );
    if (!response.ok) {
      throw new Error('Failed to update diploma');
    }
    const diplomaData = await response.json();
    return diplomaData;
  } catch (error) {
    console.error('Error updating diploma:', error);
  }
}

export async function getDiplomas() {
  const response = await fetch(`http://localhost:3000/api/diplomas`);
  const data = await response.json();
  return data;
}

export async function getStudentBySsn(ssn: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/students/ssn/${ssn}`,
    );
    const data = await response.json();
    console.log(data);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: String(error) };
  }
}

export async function addDiploma(diploma: Diploma) {
  const response = await fetch(`http://localhost:3000/api/diplomas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(diploma),
  });
  const data = await response.json();
  return data;
}
