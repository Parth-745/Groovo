import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import sendEmail from '../config/sendEmail.js';
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefereshToken from '../utils/generateRefereshToken.js';

import OtpModel from "../models/otp.model.js";
import { otpEmailTemplate } from "../utils/otpTemplate.js";

export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body;

        // 1️⃣ Required fields check
        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Name, email and password are required",
                error: true,
                success: false
            });
        }

        // 2️⃣ Check existing user
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            if (existingUser.is_verified === true) {
                // User already exists and is verified → stop registration
                return response.status(400).json({
                    message: "Email already registered",
                    error: true,
                    success: false
                });
            } else {
                // 2️⃣ User exists BUT not verified → delete old user + old OTP
                await OtpModel.deleteMany({ email });   // delete old OTPs
                await UserModel.deleteOne({ _id: existingUser._id }); // delete unverified user
            }
        }

        // 3️⃣ Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // 4️⃣ Create new user with is_verified = false
        const newUser = new UserModel({
            name,
            email,
            password: hashPassword,
            is_verified: false,
            status: "Inactive"
        });

        await newUser.save();

        // 5️⃣ Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

        // 6️⃣ Save OTP in otp collection
        await OtpModel.create({
            user: newUser._id,
            email,
            otp,
            type: "REGISTER",
            expiresAt: expiry
        });

        // 7️⃣ Send email using your resend function
        const html = otpEmailTemplate(name, otp);

        await sendEmail({
            sendTo: email,
            subject: "Groovo - Verify Your Email (OTP)",
            html
        });

        // 8️⃣ Final Response
        return response.status(200).json({
            message: "User created. OTP sent to your email.",
            error: false,
            success: true,
            data: {
                userId: newUser._id,
                email: newUser.email
            }
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
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

        if(!user.is_verified) {
            return response.status(400).json({
                message : "Email is not verified. Please verify your email to login.",
                error : true,
                success : false
            });
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












export async function verifyOtpController(req, res) {
  try {
    const { email, otp } = req.body;

    // 1️⃣ Validate
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
        error: true,
        success: false,
      });
    }

    // 2️⃣ Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // 3️⃣ Fetch latest OTP for this user (REGISTER type)
    const otpRecord = await OtpModel.findOne({
      email,
      otp,
      type: "REGISTER",
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    // 4️⃣ Check expiry
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        message: "OTP has expired",
        error: true,
        success: false,
      });
    }

    // 5️⃣ Update user as verified
    user.is_verified = true;
    user.status = "Active";
    await user.save();

    // 6️⃣ Delete OTP record
    await OtpModel.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({
      message: "OTP verified successfully",
      success: true,
      error: false,
      data: {
        userId: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}
