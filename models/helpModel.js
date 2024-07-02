import mongoose, {Schema} from "mongoose";

const helpSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is Required!"],
    },
    email: {
      type: String,
      required: [true, "Email is Required!"],
    },
    message: {
      type: String,
      required: [true, "Message is Required!"],
    },
   
  },
  { timestamps: true }
);

const Help = mongoose.model("Help", helpSchema);

export default Help;
