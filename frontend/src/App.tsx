import { DiplomaTable } from '@/components/DiplomaTable/data-table';
import { columns } from '@/components/DiplomaTable/columns';
import { diplomaData } from '@/components/DiplomaTable/data-table';
import { Button } from '@/components/ui/button';

function App() {
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
