import express from 'express';
import { newPackage,getAllpackage,seeYourPackage } from '../controller/package.controller.js';
import auth from '../middleware/authMiddleware.js'
const router=express.Router();
router.post("/",newPackage);
router.get("/",getAllpackage);
router.get("/student",auth,seeYourPackage);
export default router;