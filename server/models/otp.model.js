import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["REGISTER", "FORGOT_PASSWORD", "LOGIN"],
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }   // THIS triggers auto-deletion
    }
  },
  {
    timestamps: true,
  }
);

const OtpModel = mongoose.model("otp", otpSchema);

export default OtpModel;
