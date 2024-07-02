import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is Required!"],
    },
    email: {
      type: String,
      required: [true, " Email is Required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
      minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    profileUrl: {
      type: String,
      required: true,
    },
    location: { type: String },
    profileUrl: { type: String },
    profileLogo: { type: String },
    desc: { type: String },
    phoneNo: {
      type: Number,
      minlength: [10, "Phone Number should be 10 Number"],
    },
    profession: { type: String },
    verified: { type: Boolean, default: false },

    businessName: { type: String },
    pincode: { type: Number },
    gstin: { type: String },
    state: { type: String },
    businessAddress: { type: String },
  },
  { timestamps: true }
);

const Users = mongoose.model("User", userSchema);

export default Users;
