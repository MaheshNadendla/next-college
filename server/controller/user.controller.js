
import User from '../models/user.model.js';
import Role from '../models/role.model.js';
import College from '../models/college.model.js';
import bcrypt from 'bcrypt';
import Department from '../models/department.model.js';
import transporter from '../config/nodeMailer.js';

import dotenv from "dotenv";
import firstPasswordTemp from '../utils/firstPasswordTemp.js';
dotenv.config();


// export const addCollege = async (req, res) => {
//   try {
//     // Ensure req.user exists
//     if (!req.user || !req.user.role) {
//       return res.status(401).json({ message: "Unauthorized: No user role found" });
//     }

//     // Get the role name of the logged-in user
//     const userRole = await Role.findById(req.user.role);
//     if (!userRole || userRole.name !== "mainadmin") {
//       return res.status(403).json({ message: "Only mainadmin can create a college" });
//     }

//     const { code, name, description, address, contactEmail, contactPhone } = req.body;

//     if (!code || !name) {
//       return res.status(400).json({ message: "Code and name are required" });
//     }

//     const existingCollege = await College.findOne({ code: code.toLowerCase().trim() });
//     if (existingCollege) {
//       return res.status(409).json({ message: "College with this code already exists" });
//     }

//     const college = new College({
//       code: code.toLowerCase().trim(),
//       name: name.trim(),
//       description,
//       address,
//       contactEmail,
//       contactPhone,
//       admin: req.user._id
//     });

//     await college.save();

//     res.status(201).json({
//       message: "College created successfully",
//       college,
//     });

//   } catch (error) {
//     console.error("Error in addCollege:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// export const addRole = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       hasDepartment,
//       collegeId,
//       canAdd = [],
//       canDelete = [],
//       canView = [],
//     } = req.body;

//     if (!name || !collegeId) {
//       return res.status(400).json({ message: "Name and collegeId are required" });
//     }

//     const userRole = await Role.findById(req.user.role);
//     if (!userRole) {
//       return res.status(401).json({ message: "Invalid user role" });
//     }

//     const college = await College.findById(collegeId);
//     if (!college) {
//       return res.status(404).json({ message: "College not found" });
//     }

//     // 🔐 Permission check
//     if (userRole.name === "mainadmin") {
//       // Main admin can add role in any college
//     } else if (userRole.name === "collegeadmin") {
//       if (String(req.user.college) !== String(collegeId)) {
//         return res.status(403).json({ message: "You can only add roles in your own college" });
//       }
//     } else {
//       return res.status(403).json({ message: "You are not allowed to add roles" });
//     }

//     // 🛑 Prevent duplicate role
//     const roleExists = await Role.findOne({ name: name.toLowerCase(), college: collegeId });
//     if (roleExists) {
//       return res.status(409).json({ message: "Role already exists in this college" });
//     }

//     // ✅ Validate permission roles belong to the same college
//     const validateRoles = async (roleIds) => {
//       const roles = await Role.find({ _id: { $in: roleIds }, college: collegeId });
//       return roles.map((r) => r._id);
//     };

//     const validCanAdd = await validateRoles(canAdd);
//     const validCanDelete = await validateRoles(canDelete);
//     const validCanView = await validateRoles(canView);

//     // ✅ Create role
//     const role = new Role({
//       name: name.toLowerCase(),
//       description,
//       hasDepartment: hasDepartment || false,
//       college: collegeId,
//       canAdd: validCanAdd,
//       canDelete: validCanDelete,
//       canView: validCanView,
//     });

//     await role.save();

//     res.status(201).json({ message: "Role created successfully", role });

//   } catch (err) {
//     console.error("Error in addRole:", err.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };




// export const addDepartMent = async (req, res) => {
//   try {
//     const { name, code, description, collegeId, hod } = req.body;

//     if (!name || !code || !collegeId) {
//       return res.status(400).json({ message: "Name, code, and collegeId are required" });
//     }

//     const userRole = await Role.findById(req.user.role);
//     if (!userRole) {
//       return res.status(401).json({ message: "Invalid user role" });
//     }

//     const college = await College.findById(collegeId);
//     if (!college) {
//       return res.status(404).json({ message: "College not found" });
//     }

//     // 🔐 Permission check
//     if (userRole.name === "mainadmin") {
//       // allowed for any college
//     } else if (userRole.name === "collegeadmin") {
//       if (String(req.user.college) !== String(collegeId)) {
//         return res.status(403).json({ message: "You can only add departments in your own college" });
//       }
//     } else {
//       return res.status(403).json({ message: "You are not allowed to add departments" });
//     }

//     // 🛑 Prevent duplicate department code
//     const deptExists = await Department.findOne({ code: code.toUpperCase(), college: collegeId });
//     if (deptExists) {
//       return res.status(409).json({ message: "Department code already exists in this college" });
//     }

//     // ✅ Optional: validate if HOD exists and belongs to this college
//     let hodUser = null;
//     if (hod) {
//       hodUser = await User.findOne({ _id: hod, college: collegeId });
//       if (!hodUser) {
//         return res.status(400).json({ message: "Invalid HOD for this college" });
//       }
//     }

//     // ✅ Create department
//     const department = new Department({
//       name,
//       code: code.toUpperCase(),
//       description,
//       college: collegeId,
//       hod: hodUser?._id || null,
//     });

//     await department.save();
//     res.status(201).json({ message: "Department created successfully", department });

//   } catch (err) {
//     console.error("Error in addDepartment:", err.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };





// export const addPerson = async(req,res)=>{


//     try {

//         //UserBody chekulu

//         const {user}=req;
       
//         const { name, email, role, department } = req.body;



//         // # first dummy admin ni add chyadam

//         // const passwords = "123456"
//         // const hashedPasswords = await bcrypt.hash(passwords, 10);
//         // const newUsers = new User({
//         //   name,
//         //   email,
//         //   password: hashedPasswords,
//         //   role: '68285dc34f1041fa1a32c6d5',
//         //   department : null  
//         // });

//         // await newUsers.save();



//         //vald da, plus email exists ta

//         if (!name || !email || !role  ) {

//             return res.status(400).json({ message: 'All fields are required.' });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//           return res.status(409).json({ message: 'User with this email already exists.' });
//         }



//         // user role undha

//         const userRole = await Role.findById(user.role);
//         if (!userRole) {
//           return res.status(404).json({ message: 'User role not exist.' });
//         }

//         //person role undha

//         const personRole = await Role.findOne({ name: role });
//         console.log(personRole)
//         if (!personRole) {
//           return res.status(404).json({ message: 'Person role not exist.' });
//         }


//         // the total roles can add by User

//         const rolesUserCanAddIds = userRole.canAdd;

//         if (!rolesUserCanAddIds) {
//           return res.status(400).json({ error: "user not has permision to add user" });
//         }



//         // is the given role is present in the : user, can Add

//         const userCanAdd = rolesUserCanAddIds.includes(personRole._id)


//         // person role ki department undha

//         const personRoleHasDepartment = personRole.hasDepartment;

//         console.log("person bra : ",personRole.hasDepartment)

//         let personDepartmentId = null;

//         if(personRoleHasDepartment)
//         {

//           // person role ki department undhi : Body lo department e cha da

//           if(!department)
//           {
//                return res.status(400).json({ error: "All fields are required.(Department)" });
//           }


//           // person department anedhi departmentes lo unda

//           console.log("the Branch : ",department)

//           const personDepartment = await Branch.findOne({ code : department });
//           console.log(personDepartment)
//           if (!personDepartment || !personDepartment._id ) {
//             return res.status(404).json({ message: 'Person Department not exist.' });
//           }
//           else{
//              personDepartmentId = personDepartment._id;
//           }

//         }




//         //person eligible la

//         if(!userCanAdd)
//         {
//             return res.status(400).json({ message: 'You not Elegible to add the Person.' });
//         }

//         // console.log("msg : ",userPower,personPower,typeof(userPower),typeof(personPower))



//         // createing a user

//         const password = String(Math.floor(100000+(Math.random()*900000)))

//         const hashedPassword = await bcrypt.hash(password, 10);



//         const newUser = new User({
//           name,
//           email,
//           password: hashedPassword,
//           role: personRole._id,
//           department : personDepartmentId
//         });

//         await newUser.save();




//         // mail send cheye

//         const mailOptions = {
//             from: process.env.NODE_MAIL_EMAIL, 
//             to: email,
//             subject: "Welcome to Our Platform!",
//             html: firstPasswordTemp(name,email,password) 
//         };

//         let sendMailError = "";

//         try{
//             await transporter.sendMail(mailOptions);
//         }
//         catch(err){
//             sendMailError=" But, can't sendMail due To low Internet Connection"
//         }

        

//         // person ki department ledhu kan department e cha vu

//         if(!personRoleHasDepartment && department){

//           return res.status(200).json({message : "Person is created ( and Branch is not required)"+sendMailError,user : newUser})

//         }

//         // reponse send cheye
//         return res.status(200).json({message : "Person is created"+sendMailError,user : newUser})
      
//     }  catch (error) {
//     console.log("Error in addUser controller", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }


// }




// export const updateRolePermissions = async (req, res) => {
//   try {
//     const { roleId } = req.params;
//     const {
//       name,
//       description,
//       hasDepartment,
//       canAdd = [],
//       canView = [],
//       canDelete = []
//     } = req.body;

//     const roleToUpdate = await Role.findById(roleId);
//     if (!roleToUpdate) {
//       return res.status(404).json({ message: "Role not found" });
//     }

//     const userRole = await Role.findById(req.user.role);
//     if (!userRole) {
//       return res.status(401).json({ message: "Invalid user role" });
//     }

//     const isMainAdmin = userRole.name === "mainadmin";
//     const isCollegeAdmin = userRole.name === "collegeadmin";

//     // ❌ No one can edit mainadmin role
//     if (roleToUpdate.name === "mainadmin") {
//       return res.status(403).json({ message: "Cannot update mainadmin role" });
//     }

//     // 🧠 Logic branching
//     if (isMainAdmin) {
//       // ✅ mainadmin can update any role (including collegeadmin)
//     } else if (isCollegeAdmin) {
//       if (String(req.user.college) !== String(roleToUpdate.college)) {
//         return res.status(403).json({ message: "You can only edit roles in your own college" });
//       }

//       // ❌ collegeadmin cannot modify mainadmin or collegeadmin roles
//       const protectedRoles = ["mainadmin", "collegeadmin"];
//       if (protectedRoles.includes(roleToUpdate.name)) {
//         return res.status(403).json({ message: "You cannot modify this role" });
//       }
//     } else {
//       return res.status(403).json({ message: "You are not allowed to update roles" });
//     }

//     // ✅ Filter permission role IDs to ensure they belong to the same college
//     const collegeId = roleToUpdate.college;
//     const validateRoles = async (ids) => {
//       const roles = await Role.find({ _id: { $in: ids }, college: collegeId });
//       return roles.map(r => r._id);
//     };

//     roleToUpdate.name = name || roleToUpdate.name;
//     roleToUpdate.description = description || roleToUpdate.description;
//     roleToUpdate.hasDepartment = hasDepartment !== undefined ? hasDepartment : roleToUpdate.hasDepartment;
//     roleToUpdate.canAdd = await validateRoles(canAdd);
//     roleToUpdate.canView = await validateRoles(canView);
//     roleToUpdate.canDelete = await validateRoles(canDelete);

//     await roleToUpdate.save();

//     res.status(200).json({ message: "Role updated successfully", role: roleToUpdate });

//   } catch (err) {
//     console.error("Error in updateRolePermissions:", err.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };






// export const addPerson2 = async (req, res) => {
//   try {
//     const { user } = req;
//     const { name, email, role, department } = req.body;

//     if (!name || !email || !role) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "User with this email already exists." });
//     }

//     const userRole = await Role.findById(user.role);
//     if (!userRole) {
//       return res.status(404).json({ message: "User role not found." });
//     }

//     const personRole = await Role.findOne({ name: role });
//     if (!personRole) {
//       return res.status(404).json({ message: "Person role not found." });
//     }

//     const rolesUserCanAddIds = userRole.canAdd || [];

//     const userCanAdd = rolesUserCanAddIds.some(rid => rid.equals(personRole._id));
//     if (!userCanAdd) {
//       return res.status(403).json({ message: "You are not allowed to add this role." });
//     }

//     let personDepartmentId = null;
//     if (personRole.hasDepartment) {
//       if (!department) {
//         return res.status(400).json({ message: "Department is required for this role." });
//       }

//       const personDepartment = await Department.findOne({ code: department });
//       if (!personDepartment) {
//         return res.status(404).json({ message: "Department not found." });
//       }

//       personDepartmentId = personDepartment._id;
//     } else {
//       if (department) {
//         return res.status(400).json({ message: "This role does not require a department." });
//       }
//     }

//     // Generate password
//     const password = String(Math.floor(100000 + Math.random() * 900000));
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: personRole._id,
//       department: personDepartmentId,
//       college: user.college || null,
//       createdBy: user._id
//     });

//     await newUser.save();

//     // Send email
//     const mailOptions = {
//       from: process.env.NODE_MAIL_EMAIL,
//       to: email,
//       subject: "Welcome to Our Platform!",
//       html: firstPasswordTemp(name, email, password)
//     };

//     try {
//       await transporter.sendMail(mailOptions);
//     } catch (err) {
//       console.warn("Email sending failed:", err.message);
//     }

//     return res.status(200).json({ message: "Person created successfully", user: newUser });

//   } catch (error) {
//     console.error("Error in addPerson controller:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };















///// fixed 


export const addCollege = async (req, res) => {
  try {
    // 🛡️ Ensure user is authenticated and is a mainadmin
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Unauthorized: No user role found" });
    }

    const userRole = await Role.findById(req.user.role);
    if (!userRole || userRole.name !== "mainadmin") {
      return res.status(403).json({ message: "Only mainadmin can create a college" });
    }

    // 📥 Extract fields from request body
    const { code, name, description, address, contactEmail, contactPhone } = req.body;

    if (!code || !name) {
      return res.status(400).json({ message: "Code and name are required" });
    }

    // 🔎 Check if college code already exists
    const existingCollege = await College.findOne({ code: code.toUpperCase().trim() });
    if (existingCollege) {
      return res.status(409).json({ message: "College with this code already exists" });
    }

    // ✅ Create college
    const college = new College({
      code: code.toUpperCase().trim(),
      name: name.trim(),
      description: description?.trim() || '',
      address: address?.trim() || '',
      contactEmail: contactEmail?.toLowerCase().trim() || '',
      contactPhone: contactPhone?.trim() || '',
      active: true
    });

    await college.save();

    res.status(201).json({
      message: "College created successfully",
      college,
    });

  } catch (error) {
    console.error("Error in addCollege:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const addDepartMent = async (req, res) => {
  try {
    const { name, code, description, collegeId } = req.body;

    // 🔍 Basic validations
    if (!name || !code || !collegeId) {
      return res.status(400).json({ message: "Name, code, and collegeId are required" });
    }

    // 🔐 Get user role
    const userRole = await Role.findById(req.user.role);
    if (!userRole) {
      return res.status(401).json({ message: "Invalid user role" });
    }

    // 🏫 Check college existence
    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // 🔒 Permission check
    if (userRole.name === "mainadmin") {
      // mainadmin can add departments to any college
    } else if (userRole.name === "collegeadmin") {
      if (String(req.user.college) !== String(collegeId)) {
        return res.status(403).json({ message: "You can only add departments in your own college" });
      }
    } else {
      return res.status(403).json({ message: "You are not allowed to add departments" });
    }

    // 🚫 Check for duplicate department code within the same college
    const existingDept = await Department.findOne({
      code: code.toUpperCase(),
      college: collegeId,
    });

    if (existingDept) {
      return res.status(409).json({ message: "Department with this code already exists in this college" });
    }

    // ✅ Create department
    const department = new Department({
      name: name.trim(),
      code: code.toUpperCase().trim(),
      description: description?.trim() || '',
      college: collegeId,
    });

    await department.save();

    res.status(201).json({ message: "Department created successfully", department });

  } catch (err) {
    console.error("Error in addDepartment:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const addRole = async (req, res) => {
  try {
    const {
      name,
      description,
      hasDepartment,
      collegeId,
      canAdd = [],
      canDelete = [],
      canView = [],
    } = req.body;

    // 🛑 Validate inputs
    if (!name || !collegeId) {
      return res.status(400).json({ message: "Name and collegeId are required" });
    }

    // 🔐 Check logged-in user's role
    const userRole = await Role.findById(req.user.role);
    if (!userRole) {
      return res.status(401).json({ message: "Invalid user role" });
    }

    // 🏫 Validate college
    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // 🔒 Permissions
    if (userRole.name === "mainadmin") {
      // ✅ mainadmin can add roles anywhere
    } else if (userRole.name === "collegeadmin") {
      if (String(req.user.college) !== String(collegeId)) {
        return res.status(403).json({ message: "You can only add roles in your own college" });
      }
    } else {
      return res.status(403).json({ message: "You are not allowed to add roles" });
    }

    // 🚫 Prevent duplicate role
    const existingRole = await Role.findOne({ name: name.toLowerCase(), college: collegeId });
    if (existingRole) {
      return res.status(409).json({ message: "Role already exists in this college" });
    }

    // ✅ Filter and validate permissions
    const filterValidRoles = async (ids) => {
      const roles = await Role.find({ _id: { $in: ids }, college: collegeId });
      return roles.map(role => role._id);
    };

    const validCanAdd = await filterValidRoles(canAdd);
    const validCanDelete = await filterValidRoles(canDelete);
    const validCanView = await filterValidRoles(canView);

    // ✅ Create and save role
    const newRole = new Role({
      name: name.toLowerCase().trim(),
      description: description?.trim() || '',
      hasDepartment: hasDepartment || false,
      college: collegeId,
      canAdd: validCanAdd,
      canDelete: validCanDelete,
      canView: validCanView
    });

    await newRole.save();

    res.status(201).json({
      message: "Role created successfully",
      role: newRole
    });

  } catch (err) {
    console.error("Error in addRole:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const addPerson = async (req, res) => {
  try {
    const { name, email, role, department } = req.body;
    const creator = req.user;

    if (!name || !email || !role) {
      return res.status(400).json({ message: "Name, email, and role are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists." });
    }

    // Get creator's role
    const creatorRole = await Role.findById(creator.role);

    if (!creatorRole) {
      return res.status(403).json({ message: "Invalid creator role." });
    }

    // Get the target role to assign
    const targetRole = await Role.findById(role);
    if (!targetRole) {
      return res.status(404).json({ message: "Target role not found." });
    }

    const canAddIds = creatorRole.canAdd.map(id => String(id));


    console.log(canAddIds)

    console

    // 🔐 Access control based on admin type
    if (creatorRole.name === "mainadmin") {
      // ✅ mainadmin can add any role in any college — allow
    } else if (creatorRole.name === "collegeadmin") {
      // ✅ collegeadmin can only assign roles within same college
      if (String(targetRole.college) !== String(creator.college)) {
        return res.status(403).json({ message: "You can only assign roles within your own college." });
      }
    } 

    else if (!canAddIds.includes(String(targetRole._id))) {

      // ✅ Permission check (canAdd array)

      return res.status(403).json({ message: "You are not permitted to assign this role." });
    }

    else if (canAddIds.includes(String(targetRole._id))) {

      // ✅ Permission check (canAdd array)
    }
    
    else {
      return res.status(403).json({ message: "You are not allowed to add users." });
    }


    // ✅ Handle department if required
    let departmentId = null;
    if (targetRole.hasDepartment) {
      if (!department) {
        return res.status(400).json({ message: "Department is required for this role." });
      }

      const dept = await Department.findById(department);

      if (!dept) {
        return res.status(404).json({ message: "Department not found in the college." });
      }

      departmentId = dept._id;
    }

    // ✅ Generate random password
    const password = String(Math.floor(100000 + Math.random() * 900000));
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: targetRole._id,
      college: targetRole.college,
      department: departmentId,
      createdBy: creator._id,
    });

    await newUser.save();

    // ✅ Email the password
    const mailOptions = {
      from: process.env.NODE_MAIL_EMAIL,
      to: email,
      subject: "Welcome to Our Platform!",
      html: firstPasswordTemp(name, email, password),
    };

    let mailError = "";
    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      mailError = " (But email not sent)";
    }

    return res.status(201).json({
      message: `User created successfully${mailError}`,
      user: {
        name: newUser.name,
        email: newUser.email,
        role: role,
        college: targetRole.college,
        department: departmentId,
      },
    });

  } catch (error) {
    console.error("Error in addPerson:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const updateRolePermissions = async (req, res) => {
  try {
    const { roleId } = req.params;
    const {
      name,
      description,
      hasDepartment,
      canAdd = [],
      canView = [],
      canDelete = []
    } = req.body;

    const roleToUpdate = await Role.findById(roleId);
    if (!roleToUpdate) {
      return res.status(404).json({ message: "Role not found" });
    }

    const creator = req.user;
    const creatorRole = await Role.findById(creator.role);
    if (!creatorRole) {
      return res.status(401).json({ message: "Invalid user role" });
    }

    // ❌ No one can edit mainadmin
    if (roleToUpdate.name === "mainadmin") {
      return res.status(403).json({ message: "Cannot update mainadmin role" });
    }

    const isMainAdmin = creatorRole.name === "mainadmin";
    const isCollegeAdmin = creatorRole.name === "collegeadmin";

    if (isMainAdmin) {
      // ✅ mainadmin allowed
    } else if (isCollegeAdmin) {
      if (String(creator.college) !== String(roleToUpdate.college)) {
        return res.status(403).json({ message: "You can only edit roles in your own college" });
      }

      if (["mainadmin", "collegeadmin"].includes(roleToUpdate.name)) {
        return res.status(403).json({ message: "You cannot modify this role" });
      }
    } else if ((creatorRole.canAdd || []).map(String).includes(String(roleToUpdate._id))) {
      // ✅ User has permission via canAdd
      if (String(creator.college) !== String(roleToUpdate.college)) {
        return res.status(403).json({ message: "You can only modify roles in your own college" });
      }
    } else {
      return res.status(403).json({ message: "You are not allowed to update roles" });
    }

    // ✅ Filter roles to ensure they belong to same college
    const collegeId = roleToUpdate.college;
    const validateRoles = async (ids) => {
      const roles = await Role.find({ _id: { $in: ids }, college: collegeId });
      return roles.map(r => r._id);
    };

    roleToUpdate.name = name || roleToUpdate.name;
    roleToUpdate.description = description || roleToUpdate.description;
    roleToUpdate.hasDepartment = hasDepartment !== undefined ? hasDepartment : roleToUpdate.hasDepartment;
    roleToUpdate.canAdd = await validateRoles(canAdd);
    roleToUpdate.canView = await validateRoles(canView);
    roleToUpdate.canDelete = await validateRoles(canDelete);

    await roleToUpdate.save();

    res.status(200).json({ message: "Role updated successfully", role: roleToUpdate });

  } catch (err) {
    console.error("Error in updateRolePermissions:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

















