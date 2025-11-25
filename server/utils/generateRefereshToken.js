// import UserModel from "../models/user.model.js";


// const generateRefereshToken = async(userId)=>{
//     const token = await jwt.sign({ id: userId }, process.env.SECRET_KEY_ACCESS_TOKEN, { expiresIn: '5d' });
    
//     const updateRefreshTokenUser = await UserModel.updateOne({_id : userId},{
//         refresh_token : token
//     })

//     return token 
// }

// export default generateRefereshToken;


import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateRefereshToken = (userId) => {
    const secret = process.env.JWT_REFRESH_SECRET;
    console.log("REFRESH SECRET =", secret);

    return jwt.sign(
        { id: userId },
        secret,
        { expiresIn: '7d' }
    );
};

export default generateRefereshToken;
