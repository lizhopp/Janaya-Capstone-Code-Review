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

async function login ({ email, password}){
    try{
        const {rows:[user]} = await client.query('SELECT * FROM users WHERE email = $1;', [email]);
        if (!user) throw new Error ('Invalid email or password');
        
        const isPasswordValid= await bcrypt.compare(password,user.password);
        if(!isPasswordValid) throw new Error('Invalid email or password');
    }
}
