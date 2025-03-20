const express = require('express');
const client = require('../db/db');


const { hashPasswords } = require('./utils');

 async function registerUser({ username, email, password }) {
     try {
       const hashedPassword = await bcrypt.hash(password, 10);
       const { rows: [user] } = await client.query(`
         INSERT INTO users(username, email, password) 
         VALUES($1, $2, $3) 
         RETURNING *;
       `, [username, email, hashedPassword]);
  
      return user;
    } catch (error) {
      throw new Error(`Error registering user: ${error.message}`);
    }
   }

 /*** Creating Authentication for a user and need to generate a JWT  */

 async function loginUser({ email, password }) {
     try {
      const { rows: [user] } = await client.query('SELECT * FROM users WHERE email = $1;', [email]);
             if (!user) throw new Error('Invalid email or password');
  
       const isPasswordValid = await bcrypt.compare(password, user.password);
       if (!isPasswordValid) throw new Error('Invalid email or password');
  
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
       return { user: { id: user.id, username: user.username, email: user.email }, token };
     } catch (error) {
       throw new Error(`Error logging in: ${error.message}`);
     }
   }

// /*** Middleware to handle authentication requests using JWT   */


  function authenticate(req, res, next) {
     const token = req.header('Authorization')?.replace('Bearer ', '');
     if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
  
     try {
       const decoded = jwt.verify(token, JWT_SECRET);
       req.userId = decoded.userId;
       next();
     } catch (error) {
       res.status(400).json({ error: 'Invalid token.' });
     }
   }
  
   module.exports = {
     registerUser,
     loginUser,
    authenticate,
   };