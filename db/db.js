require('dotenv').config();

const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database(process.env.DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database: ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // db.run('DROP TABLE IF EXISTS users', (err) => {
        //     if (err) {
        //         console.log('No table "items" to drop.');
        //     } else {
        //         console.log('Dropped table "items" successfully.');
        //     }
        // });
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating table: ' + err.message);
            } else {
                console.log('Users table created or already exists.');
            }
        });
    }
});

module.exports = db;

