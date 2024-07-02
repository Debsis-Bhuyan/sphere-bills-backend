import mongoose, {Schema} from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
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
    rating: {
      type: Number,
      // required: [true, "Rating is Required"],
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
