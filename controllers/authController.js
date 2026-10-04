const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");


// =====================================================
// CUSTOMER REGISTRATION
// =====================================================

const registerCustomer = async (req, res) => {

    console.log("🔥 REGISTER CUSTOMER API CALLED");

    const { name, email, phone, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    try {

        // Check if email already exists
        const sql = "SELECT * FROM Customer WHERE Email = ?";

        db.query(sql, [email], async (err, results) => {

            if (err) {
                console.error("Email check error:", err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            // Email already registered
            if (results.length > 0) {
                return res.status(409).json({
                    message: "Email already registered"
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert customer
            const insertSQL = `
                INSERT INTO Customer
                (Name, Email, Phone, Password)
                VALUES (?, ?, ?, ?)
            `;

            db.query(
                insertSQL,
                [
                    name,
                    email,
                    phone || null,
                    hashedPassword
                ],
                (err, result) => {

                    if (err) {
                        console.error("Registration error:", err);

                        return res.status(500).json({
                            message: "Registration failed"
                        });
                    }

                    console.log("✅ Customer inserted into database");

                    res.status(201).json({
                        message: "Customer registered successfully",
                        customerId: result.insertId
                    });
                }
            );
        });

    } catch (error) {

        console.error("Server error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// =====================================================
// FREELANCER REGISTRATION
// =====================================================

const registerFreelancer = async (req, res) => {

    console.log("🔥 REGISTER FREELANCER API CALLED");

    const {
        name,
        email,
        password,
        hourlyRate
    } = req.body;

    // Check required fields
    if (!name || !email || !password) {

        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    try {

        // Check if email already exists
        const sql = "SELECT * FROM Freelancer WHERE Email = ?";

        db.query(sql, [email], async (err, results) => {

            if (err) {

                console.error("Email check error:", err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            // Email already registered
            if (results.length > 0) {

                return res.status(409).json({
                    message: "Email already registered"
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert freelancer
            const insertSQL = `
                INSERT INTO Freelancer
                (Name, Email, Password, HourlyRate)
                VALUES (?, ?, ?, ?)
            `;

            db.query(
                insertSQL,
                [
                    name,
                    email,
                    hashedPassword,
                    hourlyRate || null
                ],
                (err, result) => {

                    if (err) {

                        console.error(
                            "Freelancer registration error:",
                            err
                        );

                        return res.status(500).json({
                            message: "Registration failed"
                        });
                    }

                    console.log(
                        "✅ Freelancer inserted into database"
                    );

                    res.status(201).json({
                        message:
                            "Freelancer registered successfully",

                        freelancerId:
                            result.insertId
                    });
                }
            );
        });

    } catch (error) {

        console.error("Server error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// =====================================================
// LOGIN
// =====================================================

const login = async (req, res) => {

    console.log("🔥 LOGIN API CALLED");

    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {

        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    try {

        // =================================================
        // CHECK CUSTOMER
        // =================================================

        const customerSQL =
            "SELECT * FROM Customer WHERE Email = ?";

        db.query(
            customerSQL,
            [email],
            async (err, customerResults) => {

                if (err) {

                    console.error(
                        "Customer login error:",
                        err
                    );

                    return res.status(500).json({
                        message: "Database error"
                    });
                }

                // Customer found
                if (customerResults.length > 0) {

                    const user = customerResults[0];

                    // Compare entered password
                    // with hashed password in database
                    const passwordMatch =
                        await bcrypt.compare(
                            password,
                            user.Password
                        );

                    if (!passwordMatch) {

                        return res.status(401).json({
                            message:
                                "Invalid email or password"
                        });
                    }

                    // Create JWT
                    const token = jwt.sign(
                        {
                            id: user.CustomerID,
                            email: user.Email,
                            userType: "customer"
                        },

                        "freelancer_hub_secret",

                        {
                            expiresIn: "1h"
                        }
                    );

                    return res.status(200).json({
                        message: "Login successful",
                        token: token,
                        userType: "customer"
                    });
                }


                // =================================================
                // CHECK FREELANCER
                // =================================================

                const freelancerSQL =
                    "SELECT * FROM Freelancer WHERE Email = ?";

                db.query(
                    freelancerSQL,
                    [email],
                    async (err, freelancerResults) => {

                        if (err) {

                            console.error(
                                "Freelancer login error:",
                                err
                            );

                            return res.status(500).json({
                                message: "Database error"
                            });
                        }

                        // Freelancer found
                        if (freelancerResults.length > 0) {

                            const user =
                                freelancerResults[0];

                            // Compare entered password
                            const passwordMatch =
                                await bcrypt.compare(
                                    password,
                                    user.Password
                                );

                            if (!passwordMatch) {

                                return res.status(401).json({
                                    message:
                                        "Invalid email or password"
                                });
                            }

                            // Create JWT
                            const token = jwt.sign(
                                {
                                    id: user.FreelancerID,
                                    email: user.Email,
                                    userType: "freelancer"
                                },

                                "freelancer_hub_secret",

                                {
                                    expiresIn: "1h"
                                }
                            );

                            return res.status(200).json({
                                message:
                                    "Login successful",

                                token: token,

                                userType:
                                    "freelancer"
                            });
                        }


                        // =================================================
                        // EMAIL NOT FOUND
                        // =================================================

                        return res.status(401).json({
                            message:
                                "Invalid email or password"
                        });

                    }
                );
            }
        );

    } catch (error) {

        console.error(
            "Login server error:",
            error
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    registerCustomer,
    registerFreelancer,
    login
};