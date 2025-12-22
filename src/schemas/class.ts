import mongoose, { Schema } from "mongoose";

export const ClassSchema = new Schema({
  className: {
    type: String,
  },
  teacherId: {
    type: Schema.ObjectId,
    ref: "User", 
    required: true,
  },
  studentIds: [{
    type: Schema.ObjectId,
    ref: "User", 
    required: true,
  }],
});


const Class = mongoose.model("Class", ClassSchema);

export { Class };
