import React, { useEffect, useState } from "react";

function Home({ token }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all resources
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

  // Fetch reviews for each resource
  useEffect(() => {
    const fetchReviewsForResources = async () => {
      try {
        const reviewsResponse = await fetch('/api/reviews');
        if (!reviewsResponse.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const reviewsData = await reviewsResponse.json();

        // Map reviews to their respective resources
        const updatedResources = resources.map((resource) => ({
          ...resource,
          reviews: reviewsData.filter((review) => review.resource_id === resource.id),
        }));

        setResources(updatedResources);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (resources.length > 0) {
      fetchReviewsForResources();
    }
  }, [resources]);

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Welcome to the Coding Resource Review Website</h1>
      <h2>Resources</h2>

      <input
        type="text"
        placeholder="Search resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
      />

      {filteredResources.length > 0 ? (
        <ul>
          {filteredResources.map((resource) => (
            <li key={resource.id}>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <p>Type: {resource.type}</p>
              <p>Language: {resource.language}</p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer">
                Visit Resource
              </a>

              {/* Display Reviews */}
              <h4>Reviews</h4>
              {resource.reviews && resource.reviews.length > 0 ? (
                <ul>
                  {resource.reviews.map((review) => (
                    <li key={review.id}>
                      <p><strong>{review.userName}</strong>: {review.comment}</p>
                      <p>Rating: {review.rating}/5</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews yet.</p>
              )}
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





// import React, { useEffect, useState } from "react";

// function Home({ token }) {
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchResources = async () => {
//       try {
//         const response = await fetch('/api/resources');
//         if (!response.ok) {
//           throw new Error('Failed to fetch resources');
//         }
//         const data = await response.json();
//         setResources(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResources();
//   }, []);

//   const filteredResources = resources.filter((resource) =>
//     resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     resource.language.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Welcome to the Coding Resource Review Website</h1>
//       <h2>Resources</h2>

//       <input
//         type="text"
//         placeholder="Search resources..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
//       />

//       {filteredResources.length > 0 ? (
//         <ul>
//           {filteredResources.map((resource) => (
//             <li key={resource.id}>
//               <h3>{resource.title}</h3>
//               <p>{resource.description}</p>
//               <p>Type: {resource.type}</p>
//               <p>Language: {resource.language}</p>
//               <a href={resource.link} target="_blank" rel="noopener noreferrer">
//                 Visit Resource
//               </a>

//               {/* Display Reviews */}
//               <h4>Reviews</h4>
//               {resource.reviews && resource.reviews.length > 0 ? (
//                 <ul>
//                   {resource.reviews.map((review) => (
//                     <li key={review.id}>
//                       <p><strong>{review.userName}</strong>: {review.comment}</p>
//                       <p>Rating: {review.rating}/5</p>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No reviews yet.</p>
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No resources found.</p>
//       )}
//     </div>
//   );
// }

// export default Home;














// import React, { useEffect, useState } from "react";

// function Home({ token }) {
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState(''); // State for search term

//   useEffect(() => {
//     const fetchResources = async () => {
//       try {
//         const response = await fetch('/api/resources');
//         if (!response.ok) {
//           throw new Error('Failed to fetch resources');
//         }
//         const data = await response.json();
//         setResources(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResources();
//   }, []);

//   // Filter resources based on search term
//   const filteredResources = resources.filter((resource) =>
//     resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     resource.language.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Welcome to the Coding Resource Review Website</h1>
//       <h2>Resources</h2>

//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search resources..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
//       />

//       {/* Display Filtered Resources */}
//       {filteredResources.length > 0 ? (
//         <ul>
//           {filteredResources.map((resource) => (
//             <li key={resource.id}>
//               <h3>{resource.title}</h3>
//               <p>{resource.description}</p>
//               <p>Type: {resource.type}</p>
//               <p>Language: {resource.language}</p>
//               <a href={resource.link} target="_blank" rel="noopener noreferrer">
//                 Visit Resource
//               </a>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No resources found.</p>
//       )}
//     </div>
//   );
// }

// export default Home;



