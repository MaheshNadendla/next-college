import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    trim: true,
    default: ""
  },
  hasDepartment: {
    type: Boolean,
    default: false
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true
  },
  canAdd: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  canView: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  canDelete: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Role", roleSchema);
