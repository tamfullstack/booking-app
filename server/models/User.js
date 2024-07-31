const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  fullName: { type: String, default: "" },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, default: "" },
  isAdmin: { type: Boolean, default: false },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
});

module.exports = model("User", userSchema);
