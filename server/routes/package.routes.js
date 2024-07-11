import express from 'express';
import { newPackage,getAllpackage,seeYourPackage } from '../controller/package.controller.js';

const router=express.Router();
router.post("/",newPackage);
router.get("/",getAllpackage);
router.get("/student",seeYourPackage);
export default router;