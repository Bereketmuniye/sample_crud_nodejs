const db = require('../db/db'); 
const bcrypt=require('bcrypt');


//get all users

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    }
    );
}
//get user by id
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}
//get user by username
const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

//get user by email
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

//create user
const createUser= async (username, password, email) => {
    const hashedPassword= await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
        db.run('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, username, email });
            }
        });
    });
}
//update user
const updateUser = (id, username, password, email) => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?', [username, password, email, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.changes });
            }
        });
    });
}
//delete user
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.changes });
            }
        });
    });
}
module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
}