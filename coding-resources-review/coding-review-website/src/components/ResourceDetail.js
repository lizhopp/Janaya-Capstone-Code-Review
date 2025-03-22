import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  
  
  function ResourceDetail() {
    const { id } = useParams(); // Get the resource ID from the URL
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchResource = async () => {
        try {
          const response = await fetch(`/api/resources/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch resource');
          }
          const data = await response.json();
          setResource(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchResource();
    }, [id]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!resource) return <div>Resource not found</div>;
  
    return (
      <div>
        <h1>{resource.title}</h1>
        <p>{resource.description}</p>
        <p>Type: {resource.type}</p>
        <p>Language: {resource.language}</p>
        <a href={resource.link} target="_blank" rel="noopener noreferrer">
          Visit Resource
        </a>
      </div>
    );
  }
  
  export default ResourceDetail;