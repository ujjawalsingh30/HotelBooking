// import express from "express"
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from '@clerk/express'
// import clerkwebhooks from "./controllers/clerkWebhooks.js";

// connectDB()

// const app = express()
// app.use(cors()) // Enable Cross-origin Resource Sharing

// // middleware
// app.use(express.json())
// app.use(clerkMiddleware())

// //API to listen to clerk webhooks
// app.use("/api/clerk", clerkwebhooks);



// app.get('/', (req, res) => res.send("API is working"))

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import clerkwebhooks from "./controllers/clerkWebhooks.js";

connectDB();

const app = express();
app.use(cors()); // Enable Cross-origin Resource Sharing

// IMPORTANT: Webhook route BEFORE express.json() middleware
// Clerk webhooks need raw body for signature verification
app.post("/api/clerk", express.raw({ type: "application/json" }), (req, res, next) => {
    // Convert raw body back to JSON for processing
    req.body = JSON.parse(req.body.toString());
    next();
}, clerkwebhooks);

// Apply express.json() middleware for other routes
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => res.send("API is working"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));