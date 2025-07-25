import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/user.model.js";
import Role from "./models/role.model.js";
import College from "./models/college.model.js";
import Department from "./models/department.model.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/temporarycollege");

// Helper to create a user
async function createUser({ name, email, password, role, college = null, department = null, createdBy = null }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return new User({ name, email, password: hashedPassword, role, college, department, createdBy });
}

async function addData() {
  try {
    await College.deleteMany();
    await Role.deleteMany();
    await Department.deleteMany();
    await User.deleteMany();

    // 1. Create Main Admin College
    const mainCollege = new College({ name: "Main Admin College", code: "MAIN-COL" });
    await mainCollege.save();

    // 2. Create mainadmin role
    const mainAdminRole = new Role({
      name: "mainadmin",
      description: "Platform super administrator",
      hasDepartment: false,
      college: mainCollege._id,
      canAdd: [],
      canDelete: [],
      canView: [],
    });
    await mainAdminRole.save();

    // 3. Create 2 mainadmins
    const mainAdmin1 = await createUser({
      name: "Main Admin 1",
      email: "main1@admin.com",
      password: "123456",
      role: mainAdminRole._id,
      college: mainCollege._id
    });
    const mainAdmin2 = await createUser({
      name: "Main Admin 2",
      email: "main2@admin.com",
      password: "123456",
      role: mainAdminRole._id,
      college: mainCollege._id
    });
    await mainAdmin1.save();
    await mainAdmin2.save();

    // 4. Create 4 real colleges
    for (let i = 1; i <= 4; i++) {
      const college = new College({ name: `College ${i}`, code: `COL${i}` });
      await college.save();

      // Create roles in this college
      const collegeAdminRole = new Role({ name: "collegeadmin", college: college._id, hasDepartment: false });
      const principalRole = new Role({ name: "principal", college: college._id, hasDepartment: false });
      const hodRole = new Role({ name: "hod", college: college._id, hasDepartment: true });
      const staffRole = new Role({ name: "staff", college: college._id, hasDepartment: true });
      const studentRole = new Role({ name: "student", college: college._id, hasDepartment: true });

      await Promise.all([collegeAdminRole.save(), principalRole.save(), hodRole.save(), staffRole.save(), studentRole.save()]);

      // Set permissions
      collegeAdminRole.canAdd = [principalRole._id, hodRole._id, staffRole._id, studentRole._id];
      collegeAdminRole.canView = collegeAdminRole.canAdd;
      collegeAdminRole.canDelete = collegeAdminRole.canAdd;
      await collegeAdminRole.save();

      // Create a college admin
      const collegeAdmin = await createUser({
        name: `College${i} Admin`,
        email: `admin${i}@college.com`,
        password: "123456",
        role: collegeAdminRole._id,
        college: college._id,
        createdBy: mainAdmin1._id
      });
      await collegeAdmin.save();

      // Add 2 departments
      const cse = new Department({ name: "CSE", code: `CSE${i}`, college: college._id });
      const ece = new Department({ name: "ECE", code: `ECE${i}`, college: college._id });
      await cse.save();
      await ece.save();

      const deptList = [cse, ece];

      for (const dept of deptList) {
        const hod = await createUser({
          name: `HOD ${dept.name}`,
          email: `hod${dept.code}@college.com`,
          password: "123456",
          role: hodRole._id,
          college: college._id,
          department: dept._id,
          createdBy: collegeAdmin._id
        });
        const staff = await createUser({
          name: `Staff ${dept.name}`,
          email: `staff${dept.code}@college.com`,
          password: "123456",
          role: staffRole._id,
          college: college._id,
          department: dept._id,
          createdBy: collegeAdmin._id
        });
        const student = await createUser({
          name: `Student ${dept.name}`,
          email: `student${dept.code}@college.com`,
          password: "123456",
          role: studentRole._id,
          college: college._id,
          department: dept._id,
          createdBy: collegeAdmin._id
        });

        await hod.save();
        await staff.save();
        await student.save();
      }
    }

    console.log("✅ All data seeded successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

addData();