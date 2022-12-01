import { Schema, model } from "mongoose";

import { IUserDocument } from "../Types";

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, "Please provide name field"],
    },
    email: {
      type: String,
      required:  [true, "Please provide email field"],
      index: true,
    },
    password: {
      type: String,
      required:  [true, "Please provide password field"],
    },
    role: {
        type: String,
        default: "USER",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


export default model<IUserDocument>("User", UserSchema);
