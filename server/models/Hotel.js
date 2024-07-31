const { Schema, model } = require("mongoose");

const hotelSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: String, required: true },
  photos: { type: Object, required: true },
  desc: { type: String, required: true },
  rating: { type: Number, required: true },
  featured: { type: String, required: true },
  rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  cheapestPrice: { type: Number, required: true },
});

module.exports = model("Hotel", hotelSchema);
