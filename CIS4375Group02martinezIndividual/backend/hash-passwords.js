const bcrypt = require('bcrypt');
const pool = require('./DbConnection');
 // Make sure to point to the correct file

const saltRounds = 10; // The cost factor for hashing

function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

function updatePasswords() {
  // Get all users with plain text passwords
  pool.query('SELECT id, password FROM users', async (err, users) => {
    if (err) {
      throw err;
    }

    for (let user of users) {
      // Hash each user's plain text password
      const hashedPassword = hashPassword(user.password);

      // Update the user's password in the database with the new hashed password
      pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id], (err, result) => {
        if (err) {
          throw err;
        }
        console.log(`Updated user ${user.id}`);
      });
    }
  });
}

// Run the function to update passwords
updatePasswords();
