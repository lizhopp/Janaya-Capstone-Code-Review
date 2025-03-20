
import './App.css'
import React from 'react';
import ResourceList from './components/ResourceList';

function App() {
  return (
    <div>
      <h1>Coding Resource Review</h1>
      <ResourceList />
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </Router>
    </div>

  );
}

export default App;

