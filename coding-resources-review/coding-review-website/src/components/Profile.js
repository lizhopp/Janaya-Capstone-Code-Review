import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details
    fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        
      },
     
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then(data => setUser(data))
      
      .catch(error => {
        console.error('Error fetching user:', error);
        navigate('/login'); // Redirect to login if unauthorized
      });

    // Fetch user reviews
    fetch('/api/resources/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        return response.json();
      })
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));

    // Fetch user favorites
    fetch('/api/favorites/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        return response.json();
      })
      .then(data => setFavorites(data))
      .catch(error => console.error('Error fetching favorites:', error));
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <h2>User Details</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>

      <div>
        <h2>My Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id}>
              <h3>{review.resource.title}</h3>
              <p>Rating: {review.rating}</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <div>
        <h2>My Favorites</h2>
        {favorites.length > 0 ? (
          favorites.map(favorite => (
            <div key={favorite.id}>
              <h3>{favorite.resource.title}</h3>
              <p>{favorite.resource.description}</p>
              <a href={favorite.resource.link} target="_blank" rel="noopener noreferrer">Visit Resource</a>
            </div>
          ))
        ) : (
          <p>No favorites yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;