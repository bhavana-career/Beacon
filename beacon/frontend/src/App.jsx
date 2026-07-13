import { useState } from 'react';
import { Activity } from 'lucide-react';
import Home from './pages/Home';

function App() {
  // Global state for our application
  // When the user uploads a file, we'll store the backend response here.
  const [reportId, setReportId] = useState(null);
  const [reportData, setReportData] = useState(null);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      
      {/* Header */}
      <header className="w-full max-w-6xl mb-10 flex items-center gap-3">
        <div className="bg-beacon-600 p-2 rounded-lg">
          <Activity className="text-white w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Beacon</h1>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-6xl flex flex-col gap-8">
        
        <Home 
          reportId={reportId}
          reportData={reportData}
          setReportId={setReportId}
          setReportData={setReportData}
        />

      </main>

    </div>
  );
}

export default App;
