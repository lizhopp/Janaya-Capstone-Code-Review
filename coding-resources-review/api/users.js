// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// app.post('/api/register', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await client.query(
//       'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
//       [username, email, hashedPassword]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// app.post('/api/login', async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
//       if (result.rows.length === 0) {
//         return res.status(401).json({ error: 'Invalid email or password' });
//       }
//       const user = result.rows[0];
//       const passwordMatch = await bcrypt.compare(password, user.password);
//       if (!passwordMatch) {
//         return res.status(401).json({ error: 'Invalid email or password' });
//       }
//       const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.status(200).json({ token });
//     } catch (error) {
//       console.error('Error logging in:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
// // 