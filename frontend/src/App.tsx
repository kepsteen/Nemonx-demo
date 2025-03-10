import { DiplomaTable } from '@/components/DiplomaTable/data-table';
import { columns } from '@/components/DiplomaTable/columns';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Diploma } from '@/types';

function App() {
  const [diplomaData, setDiplomaData] = useState<Diploma[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getDiplomas() {
      try {
        const response = await fetch('/api/diplomas');
        const data = (await response.json()) as Diploma[];
        setDiplomaData(data);
        console.log(data);
      } catch (error) {
        setError(String(error));
      } finally {
        setLoading(false);
      }
    }
    getDiplomas();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1 className="text-4xl font-semibold font-clash">Nemonx Demo</h1>
      <section className="mt-10 p-4">
        <Button>Add Diploma</Button>
        <DiplomaTable columns={columns} data={diplomaData} />
      </section>
    </>
  );
}

export default App;
