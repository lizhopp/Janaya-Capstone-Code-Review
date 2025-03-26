import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [resources, setResources] = useState([]);

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

    return (
        <div className="dashboard">
            <h1>Welcome, {user.username}</h1>
            <h2>Your Coding Resources</h2>
            <Link to="/resources/add" className="btn">Add New Resource</Link>
            <ul>
                {resources.map(resource => (
                    <li key={resource.id}>
                        <Link to={`/resources/${resource.id}`}>{resource.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;