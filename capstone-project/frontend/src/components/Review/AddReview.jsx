import React, { useState } from 'react';
import axios from 'axios';

const AddReview = ({ resourceId }) => {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(1);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/reviews`, {
                resourceId,
                reviewText,
                rating,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSuccess('Review added successfully!');
            setReviewText('');
            setRating(1);
        } catch (err) {
            setError('Failed to add review. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add a Review</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>{star}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="reviewText">Review:</label>
                    <textarea
                        id="reviewText"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default AddReview;