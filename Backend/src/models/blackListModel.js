import mongoose from "mongoose";

const blacklistedTokensModel = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("blacklistedTokens",blacklistedTokensModel)