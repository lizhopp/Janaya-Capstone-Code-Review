import React, { useEffect, useState } from 'react';

function ResourceReviews({ resourceId }) {
  const [reviewsByResource, setReviewsByResource] = useState({});
  const resourceIds = [1, 2, 3]; // Replace with your resource IDs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAllReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all reviews:', error);
      throw new Error('Failed to fetch reviews. Please try again later.');
    }
  };

  const loadReviews = async () => {
    try {
      const allReviews = await fetchAllReviews();
      const reviewsMap = resourceIds.reduce((acc, id) => {
        acc[id] = allReviews.filter((review) => review.resource_id === id);
        return acc;
      }, {});
      setReviewsByResource(reviewsMap);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [resourceIds]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {resourceIds.map((id) => (
        <div key={id}>
          <h3>Resource {id} Reviews</h3>
          {reviewsByResource[id] ? (
            reviewsByResource[id].length > 0 ? (
              reviewsByResource[id].map((review) => (
                <div key={review.id}>
                  <p><strong>Rating:</strong> {review.rating}</p>
                  <p><strong>Comment:</strong> {review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )
          ) : (
            <p>Loading reviews...</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ResourceReviews;

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         console.log(`Fetching reviews for resource ID: ${resourceId}`); //
//         const response = await fetch(`/api/resources/${resourceId}/reviews`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch reviews');
//         }
//         const data = await response.json();
//         console.log('Fetched reviews:', data);
//         setReviews(data);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, [resourceId]);

//   if (loading) return <div>Loading reviews...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h3>Reviews</h3>
//       {reviews.length > 0 ? (
//         <ul>
//           {reviews.map((review) => (
//             <li key={review.id}>
//               <p><strong>Rating:</strong> {review.rating}/5</p>
//               <p><strong>Comment:</strong> {review.comment}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No reviews yet.</p>
//       )}
//     </div>
//   );
// }

// export default ResourceReviews;