const express = require("express");
const cors = require("cors");

const db = require("./db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Freelancer Hub Backend is running!");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});