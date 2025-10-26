import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RecipeManager from './pages/RecipeManager';
import MashCurves from './pages/MashCurves';
import FermentationCurves from './pages/FermentationCurves';
import MaltDatabase from './pages/MaltDatabase';
import BrewingJournal from './pages/BrewingJournal';
import BrewbrainIntegration from './pages/BrewbrainIntegration';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/recipes" element={<RecipeManager />} />
              <Route path="/mash-curves" element={<MashCurves />} />
              <Route path="/fermentation-curves" element={<FermentationCurves />} />
              <Route path="/malt-database" element={<MaltDatabase />} />
              <Route path="/brewing-journal" element={<BrewingJournal />} />
              <Route path="/brewbrain" element={<BrewbrainIntegration />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
