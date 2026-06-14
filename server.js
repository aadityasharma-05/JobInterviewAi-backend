require("dotenv").config()
const app = require("./src/app")
const path = require("path");
const connectToDB = require("./src/config/database")

connectToDB()

console.log("ENV CHECK:", {
    GEMINI_KEY: process.env.GEMINI_API_KEY,
    GOOGLE_KEY: process.env.GOOGLE_GENAI_API_KEY,
    dotenvPath: path.join(__dirname, ".env")
})
console.log("server.js loaded");

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})