import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const { user, token } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        if (token) {
            fetchProfileData();
        }
    }, [token]);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <h2>Username: {profileData.username}</h2>
            <h2>Email: {profileData.email}</h2>
            {profileData.isAdmin && <h2>Status: Admin</h2>}
            <h3>Your Resources:</h3>
            <ul>
                {profileData.resources && profileData.resources.map(resource => (
                    <li key={resource.id}>{resource.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;