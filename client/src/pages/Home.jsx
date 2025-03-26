import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [resources, setResources] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get('/api/resources');
                setResources(response.data);
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };

        fetchResources();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredResources = resources.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home">
            <h1>Coding Resources</h1>
            <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul>
                {filteredResources.map(resource => (
                    <li key={resource.id}>
                        <h2>{resource.title}</h2>
                        <p>{resource.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;