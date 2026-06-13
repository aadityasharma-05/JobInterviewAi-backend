const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")



async function authUser(req, res, next) {
    console.log("--- Auth Middleware Trace ---");
    console.log("Origin Header:", req.headers.origin);
    console.log("Cookies Received:", req.cookies);
    
    const token = req.cookies.token

    if (!token) {
        console.log("Auth Failure: Token not provided in cookies.");
        return res.status(401).json({
            message: "Token not provided."
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })

    if (isTokenBlacklisted) {
        console.log("Auth Failure: Token is blacklisted.");
        return res.status(401).json({
            message: "token is invalid"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        console.log("Auth Success: Token verified for user:", decoded.username);

        next()

    } catch (err) {
        console.log("Auth Failure: JWT verification failed:", err.message);
        return res.status(401).json({
            message: "Invalid token."
        })
    }

}


module.exports = { authUser }