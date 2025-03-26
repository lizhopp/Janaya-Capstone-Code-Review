import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResourceList = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get('/api/resources');
                setResources(response.data);
            } catch (err) {
                setError(err.message);
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
            <h2>Coding Resources</h2>
            <ul>
                {resources.map(resource => (
                    <li key={resource.id}>
                        <h3>{resource.title}</h3>
                        <p>{resource.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResourceList;