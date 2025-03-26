import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/auth/me', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (credentials) => {
        const response = await axios.post('/api/auth/login', credentials, { withCredentials: true });
        setUser(response.data);
    };

    const register = async (userData) => {
        const response = await axios.post('/api/auth/register', userData, { withCredentials: true });
        setUser(response.data);
    };

    const logout = async () => {
        await axios.post('/api/auth/logout', {}, { withCredentials: true });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};