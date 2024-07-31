const { Schema, model } = require("mongoose");

const roomSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    desc: { type: String, required: true },
    roomNumbers: { type: Object, required: true },
  },
  { timestamps: true }
);

module.exports = model("Room", roomSchema);
