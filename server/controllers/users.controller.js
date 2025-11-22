import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import sendEmail from '../config/sendEmail.js';

export async function registerUserController(request, response) {
    try {
        const {name, email , password} = request.body ;

        if(!name || !email || !password) {
            return response.status(400).json({
                message : "Name, email and password are required",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({email});

        if(user){
            return response.json({
                message : "Already registerd email",
                error : true,
                success : false
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const payload = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const verifyEmailurl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : " Verify your email address from Groovo",
            html : verifyEmailTemplate({
                name,
                url : verifyEmailurl
            })
        })

        return response.json({
            message : "User registered successfully",
            error : false,
            success : true,
            data : save
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}