import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResourceDetail = () => {
    const { id } = useParams();
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const response = await axios.get(`/api/resources/${id}`);
                setResource(response.data);
            } catch (err) {
                setError(err.response ? err.response.data : 'Error fetching resource');
            } finally {
                setLoading(false);
            }
        };

        fetchResource();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="resource-detail">
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">View Resource</a>
        </div>
    );
};

export default ResourceDetail;