// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();

// const generateAccessToken = async(userId) => {
//     // Implementation for generating access token
//     const token = jwt.sign({ id: userId }, process.env.SECRET_KEY_ACCESS_TOKEN, { expiresIn: '1h' });

//     return token 

// }

// export default generateAccessToken;


import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = (userId) => {
    console.log("ACCESS TOKEN SECRET =", process.env.JWT_SECRET); // DEBUG

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing from .env");
    }

    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

export default generateAccessToken;
