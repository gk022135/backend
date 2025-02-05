const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./Models/db"); // Ensure database connection is correctly set up

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:3000", // Change this to your frontend URL
    credentials: true,
};
app.use(cors(corsOptions));

// Import Routes
const SinLog = require("./Routes/SinLog"); 
app.use("/qr-code-system", SinLog);

// Serve Frontend (Ensure 'build' is correct, not 'dist')
const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "my-app/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "my-app", "build", "index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
