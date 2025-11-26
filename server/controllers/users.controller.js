import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import sendEmail from '../config/sendEmail.js';
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefereshToken from '../utils/generateRefereshToken.js';

// Register User Controller
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

// Verify Email Controller
export async function verifyEmailController(request, response) {
    try {
        const {code} = request.query ;

        const user = await UserModel.findOne({_id : code});

        if(!user){
            return response.status(400).json({
                message : "Invalid verification code",
                error : true,
                success : false
            })
        }

        const updatedUser = await UserModel.updateOne({_id : code},{
            verify_email : true
        } )

        return response.json({
            message : "Email verified successfully",
            error : false,
            success : true,
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//Login User Controller
export async function loginController(request, response) {
    try{

        console.log("LOGIN CONTROLLER — JWT_SECRET =", process.env.JWT_SECRET);
        const {email, password} = request.body ;

        if(!email || !password){
            return response.status(400).json({
                message : "Email and password are required",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({email});

        if(!user){
            return response.status(400).json({
                message : "Invalid email or password",
                error : true,
                success : false
            })
        }

        if(user.status !== "Active"){
            return response.status(400).json({
                message : `Your account is ${user.status}. Please contact to admin.`,
                error : true,
                success : false
            })
        }


        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            return response.status(400).json({
                message : "Invalid email or password",
                error : true,
                success : false
            })
        }

        const accessToken = generateAccessToken(user._id);

        const refereshToken =  generateRefereshToken(user._id);

        const cookiesOptions = {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "None"
        }
        response.cookie('accessToken', accessToken, cookiesOptions); 
        response.cookie('refreshToken', refereshToken, cookiesOptions); 

        return response.status(200).json({
            message : "Login successful",
            error : false, 
            success : true,
            data : {
                accessToken,
                refereshToken
            } 
        })

    } catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }    
}