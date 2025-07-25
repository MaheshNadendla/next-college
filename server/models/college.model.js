// import mongoose from "mongoose";

// const collegeSchema = new mongoose.Schema({
//   code: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   description: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   departments: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Department"
//     }
//   ],
//   admin: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//   address: {
//     type: String,
//     default: ''
//   },
//   contactEmail: {
//     type: String,
//     trim: true,
//     lowercase: true
//   },
//   contactPhone: {
//     type: String,
//     trim: true
//   },
//   active: {
//     type: Boolean,
//     default: true
//   }
// });

// export default mongoose.model("College", collegeSchema);







import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  address: {
    type: String,
    default: ''
  },
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  contactPhone: {
    type: String,
    trim: true
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model("College", collegeSchema);

