import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

const auth = asyncHandler(async (req, res, next) => {
    // Get token from header
    let token = req.headers.authorization;

    // Check if not token
    if (!token) {
        res.status(401);
        throw new Error("No token. Authorization denied.");
    }

    // Verify token
    try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (err) {
        res.status(401);
        throw new Error("Token is not valid.");
    }
});

export default auth;
