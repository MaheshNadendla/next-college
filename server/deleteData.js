import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/user.model.js";
import Role from "./models/role.model.js";
import College from "./models/college.model.js";
import Department from "./models/department.model.js";

dotenv.config(); // Load your .env file

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/temporarycollege", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

const deleteAllData = async () => {
  try {
    await connectDB();

    const userDel = await User.deleteMany();
    const roleDel = await Role.deleteMany();
    const collegeDel = await College.deleteMany();
    const deptDel = await Department.deleteMany();

    console.log("🧹 All collections cleaned:");
    console.log(`Users deleted: ${userDel.deletedCount}`);
    console.log(`Roles deleted: ${roleDel.deletedCount}`);
    console.log(`Colleges deleted: ${collegeDel.deletedCount}`);
    console.log(`Departments deleted: ${deptDel.deletedCount}`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error while deleting:", err.message);
    process.exit(1);
  }
};

deleteAllData();
