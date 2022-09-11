import * as mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: [true, "Password is required"],
  },
  salt: Number,

  gender: {
      type: String,
      enum: ['male', 'female'],
      default: "male",
  },
},
{ timestamps: { createdAt: "created_at", updatedAt: false } }

);