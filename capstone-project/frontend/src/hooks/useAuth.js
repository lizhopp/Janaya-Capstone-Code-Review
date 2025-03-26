import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const register = async (username, email, password) => {
        try {
            const response = await axios.post('/api/auth/register', { username, email, password });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const getCurrentUser = async () => {
        try {
            const response = await axios.get('/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser(response.data);
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    return {
        user,
        loading,
        error,
        register,
        login,
        logout
    };
};

export default useAuth;