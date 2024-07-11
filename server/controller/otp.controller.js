import { sendOtp ,generateOtp} from "../utils/otp.js";
import User from '../model/user.model.js';
import Package from "../model/package.model.js";
import mongoose from 'mongoose';
const otpStore = new Map(); 
export const createOtp=async(req,res)=>{
    try {
        const { packageId } = req.params;
        //const { userId } = req.body; // Assume userId is sent in the request body
        const packageData=await Package.findById(packageId)
        const registrationNumber=packageData.registrationNumber;
        const user = await User.findOne({registrationNumber});
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const otp = generateOtp();
        otpStore.set(packageId, { otp, user });
         let contactNumber=String(user.contactNumber);
          contactNumber='+91'+contactNumber;
          //contactNumber=Number(contactNumber);
        await sendOtp(contactNumber, otp);
        res.json({ message: 'OTP sent to your contact number' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
export const verifyOtp=async(req,res)=>{
    try {
        const { packageId } = req.params;
        const { otp } = req.body;
    
        const storedOtp = otpStore.get(packageId);
        if (!storedOtp || storedOtp.otp !== otp) {
          return res.status(400).json({ message: 'Invalid OTP' });
        }
    
        const packageData = await Package.findById(packageId);
        if (!packageData) {
          return res.status(404).json({ message: 'Package not found' });
        }
    
        packageData.isTaken = true;
        await packageData.save();
    
        otpStore.delete(packageId); // Remove OTP after successful verification
        res.json({ message: 'Package marked as taken' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}