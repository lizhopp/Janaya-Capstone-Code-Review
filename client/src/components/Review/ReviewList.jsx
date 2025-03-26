import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ resourceId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/resources/${resourceId}/reviews`);
                setReviews(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [resourceId]);

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>Error fetching reviews: {error}</p>;

    return (
        <div>
            <h2>Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <strong>{review.username}</strong>: {review.content}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReviewList;