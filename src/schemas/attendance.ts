import mongoose, { Schema } from "mongoose";

export const AttendanceSchema = new Schema({
  classId: {
    type: Schema.ObjectId,
    ref: "Class", 
    required: true,
  },
  studentId: {
    type: Schema.ObjectId,
    ref: "User", 
    required: true,
  },
  status: {
    type: String, 
    enum: ["present", "absent"], 
    required: true
  },
});


const Attendance = mongoose.model("Attendance", AttendanceSchema);

export { Attendance };
