import { DiplomaTable } from '@/components/DiplomaTable/data-table';
import { columns } from '@/components/DiplomaTable/columns';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Diploma } from '@/types';
import { AddDiplomaModal } from './components/AddDiplomaModal/add-diploma-modal';

function App() {
  const [diplomaData, setDiplomaData] = useState<Diploma[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  async function getDiplomas() {
    try {
      const response = await fetch(`http://localhost:3000/api/diplomas`);
      const data = (await response.json()) as Diploma[];
      setDiplomaData(data);
    } catch (error) {
      setError(String(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
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
      <section className="mt-10 p-4">
        <Button className="mb-4" onClick={() => setOpen(true)}>
          Add Diploma
        </Button>
        <DiplomaTable
          columns={columns}
          data={diplomaData}
          setData={setDiplomaData}
        />
        <AddDiplomaModal open={open} setOpen={setOpen} />
      </section>
    </>
  );
}

export default App;
