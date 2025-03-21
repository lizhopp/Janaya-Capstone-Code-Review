import './App.css';
import { useState } from 'react';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; // Add BrowserRouter
import Home from './components/Home';
import ResourceDetail from './components/ResourceDetail';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <BrowserRouter>
      <>
        <Navigation token={token} setToken={setToken} />
        <div id="container">
          <h1>Welcome to the Coding Resource Review Website</h1>
        </div>
        <div id="main-section">
          <Routes>
            <Route path="/" element={<Home setToken={setToken} token={token}/>} />
            <Route path="/resources/:id" element={<ResourceDetail setToken={setToken} token={token}/>} />
            <Route path="/login" element={<Login setToken={setToken} />} /> {/* Pass setToken to Login */}
            <Route path="/register" element={<Register setToken={setToken} token={token}  />} />
            <Route path="/profile"element={<ProtectedRoute token={token}><Profile setToken={setToken} token={token} />
      </ProtectedRoute>
              }
              />
          </Routes>
        </div>
      </>
      </BrowserRouter>
  );
}

export default App;