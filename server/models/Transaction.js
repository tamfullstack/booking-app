const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
    room: { type: Array, required: true },
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
    price: { type: Number, required: true },
    payment: { type: String, required: true },
    status: { type: String, default: "Booked" },
  },
  { timestamps: true }
);

module.exports = model("Transaction", transactionSchema);
