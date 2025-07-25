import express from 'express'

import { addCollege, addDepartMent, addPerson, addRole, updateRolePermissions } from '../controller/user.controller.js';

const userRoute = express.Router()


userRoute.post('/add-college',addCollege);
userRoute.post('/add-dept',addDepartMent);
userRoute.post('/add-role',addRole);
userRoute.post('/add-person',addPerson);
userRoute.post('/modify-role',updateRolePermissions);




export default userRoute;

