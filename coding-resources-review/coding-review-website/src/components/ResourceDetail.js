
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ResourceDetails() {
  const { id } = useParams(); // Get the resource ID from the URL
  const [resource, setResource] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch resource details
    fetch(`/api/resources/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Resource not found');
        }
        return response.json();
      })
      .then(data => setResource(data))
      .catch(error => {
        console.error('Error fetching resource:', error);
        setError('Failed to load resource details');
      });

    // Fetch reviews for the resource
    fetch(`/api/resources/${id}/reviews`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        return response.json();
      })
      .then(data => setReviews(data))
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{resource.title}</h1>
      <p>{resource.description}</p>
      <a href={resource.link} target="_blank" rel="noopener noreferrer">Visit Resource</a>

      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <p><strong>Rating:</strong> {review.rating}/5</p>
            <p><strong>Comment:</strong> {review.comment}</p>
            <p><strong>By:</strong> {review.user.username}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}

export default ResourceDetails;