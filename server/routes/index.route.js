import express from 'express';

import userRoute from './user.route.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import authrouter from './auth.route.js';



const router = express.Router();


router.use('/user',protectRoute, userRoute);     
router.use('/auth',authrouter)          


export default router;
