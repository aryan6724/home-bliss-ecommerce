import mongoose, { Schema, models } from "mongoose";

const MessageSchema = new Schema(
  {
    messageId: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    email: String,
    phone: String,
    message: String,
    date: String,
    status: {
      type: String,
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

const Message =
  models.Message || mongoose.model("Message", MessageSchema);

export default Message;