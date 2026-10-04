const express = require("express");

const {
    registerCustomer,
    registerFreelancer,
    login
} = require("../controllers/authController");

const router = express.Router();

router.post("/customer/register", registerCustomer);

router.post("/freelancer/register", registerFreelancer);

router.post("/login", login);

module.exports = router;