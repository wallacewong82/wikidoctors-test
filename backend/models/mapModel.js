import mongoose from "mongoose";

const mapSchema = new mongoose.Schema({
  mapApi: {
    type: String,
    required: true,
  },

});

const Map = mongoose.model("Map", mapSchema);

export default Map;
