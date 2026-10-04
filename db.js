const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nimisha@26",
    database: "FreelancerHub"
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL connection failed:");
        console.error(err.message);
        return;
    }

    console.log("✅ Connected to FreelancerHub MySQL database!");
});

module.exports = db;