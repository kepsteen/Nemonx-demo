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
