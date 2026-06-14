const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:5173",
]

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, Postman)
        if (!origin) return callback(null, true)
        if (allowedOrigins.includes(origin)) {
            return callback(null, true)
        }
        return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true
}))
console.log("app.js loaded");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err)

    // Handle specific error types
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message })
    }
    if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid ID format" })
    }

    res.status(err.status || 500).json({
        message: err.message || "An unexpected error occurred on the server.",
        error: process.env.NODE_ENV === "development" ? err.stack : undefined
    })
})

module.exports = app