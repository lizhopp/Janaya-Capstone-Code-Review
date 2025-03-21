import React, { useEffect, useState } from 'react';
import ResourceDetail from '../components/ResourceDetail';

function Home() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Fetch resources from the backend
    fetch('/api/resources')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setResources(data))
      .catch(error => console.error('Error fetching resources:', error));
  }, []);

  return (
    <div>
      <h1>Resources</h1>
      <div>
        {resources.map(resource => (
          <ResourceDetail key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}

export default Home;