import React, { useEffect, useState } from "react";

function Home({ token }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('/api/resources');
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        const data = await response.json();
        setResources(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Welcome to the Coding Resource Review Website</h1>
      <h2>Resources</h2>
      {resources.length > 0 ? (
        <ul>
          {resources.map((resource) => (
            <li key={resource.id}>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <p>Type: {resource.type}</p>
              <p>Language: {resource.language}</p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer">
                Visit Resource
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No resources found.</p>
      )}
    </div>
  );
}

export default Home;