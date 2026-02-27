import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  fileId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
});

export const ImageModel = mongoose.model("Image", imageSchema);
