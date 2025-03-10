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
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-8 px-4 max-w-7xl min-h-screen">
        <h1 className="text-3xl font-semibold text-center text-green-600 mb-8 font-clash">
          Nemonx Demo
        </h1>
        <section>
          <div className="mb-6">
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setOpen(true)}
            >
              Add Diploma
            </Button>
          </div>
          <div>
            <DiplomaTable
              columns={columns}
              data={diplomaData}
              setData={setDiplomaData}
            />
          </div>
          <AddDiplomaModal open={open} setOpen={setOpen} />
        </section>
      </div>
    </>
  );
}

export default App;
