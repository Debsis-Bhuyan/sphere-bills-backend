import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";

export const register = async (req, res) => {
  const { fullName, email, password, profileUrl } = req.body;
  console.log(fullName, email, password, profileUrl)

  //validate fileds
  if (!(fullName || email || password, profileUrl)) {
    return res.status(200).json({
      success: false,
      message: "Please fill all the required fields.",
    });
  }
  if (password.length < 8) {
    return res.status(200).json({
      success: false,
      message: "Please enter minimum 8 character in password fields.",
    });
  }
  try {
    const userExist = await Users.findOne({ email });

    if (userExist) {
      return res.status(200).json({
        success: false,
        message: "User already exists in the system. Please try logging in.",
      });
    }

    const hashedPassword = await hashString(password);

    const user = await Users.create({
      fullName,
      email,
      password: hashedPassword,
      profileUrl,
    });
    const token = createJWT(user?._id);
    //send email verification to user
    // sendVerificationEmail(user, res);

    res.status(201).json({
      success: true,
      message: "SignUp successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //validation
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        message: "Please fill all the required fields.",
      });
    }
    if (password.length < 8) {
      return res.status(200).json({
        success: false,
        message: "Please enter minimum 8 character in password fields.",
      });
    }
    // find user by email
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User does not exists in the system. Please register.",
      });
    }

    // compare password
    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      return res.status(200).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    user.password = undefined;

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { userId, email, oldpassword, newpassword } = req.body;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found in the system.",
      });
    }

    const isMatch = await compareString(oldpassword, user?.password);
    if (!isMatch) {
      return res.status(200).json({
        success: false,
        message: "Old password is incorrect.",
      });
      
    }

    const hashedPassword = await hashString(newpassword);
    user.password = hashedPassword;
    await user.save();
    res.status(201).json({
      success: false,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

// export const updateProfile = async (req, res) => {
//   const {
//     userId,
//     fullName,
//     phoneNo,
//     email,
//     businessName,
//     pincode,
//     gstin,
//     state,
//     businessAddress,
//     desc,
//   } = req.body;
//   console.log(userId, fullName, phoneNo, email);

//   try {
//     const user = Users.findById(userId);
//     console.log(user);
//     console.log("hi");

//     res.json({ msg: "update  profile successfily" });
//   } catch (error) {
//     console.log(error);
//     res.json({ msg: "update not profile successfily" });
//   }
// };
// import Users from './models/Users'; // Import your User model

export const updateProfile = async (req, res) => {
  const {
    userId,
    fullName,
    phoneNo,
    email,
    businessName,
    pincode,
    gstin,
    state,
    businessAddress,
    desc,
  } = req.body;
  const userExist = Users.findById(userId);
  if (!userExist) {
    return res.status(200).json({ message: "User not found" });
  }
  try {
    // Update the user document in the database
    const user = await Users.findByIdAndUpdate(
      userId,
      {
        phoneNo,
        fullName,
        email,
        businessName,
        pincode,
        gstin,
        state,
        businessAddress,
        desc,
      },
      { new: true }
    ); // { new: true } ensures the updated document is returned

    console.log("User updated successfully:", user);
    res.status(201).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
