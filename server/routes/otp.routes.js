import express from 'express';
import { createOtp ,verifyOtp} from '../controller/otp.controller.js';
const router=express.Router();

router.post('/:packageId',createOtp);
router.post('/verify',verifyOtp);
export default router;