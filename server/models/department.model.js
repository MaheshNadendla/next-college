import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: "",
    trim: true
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Department", departmentSchema);

