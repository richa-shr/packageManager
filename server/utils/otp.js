import twilio from  'twilio';
import crypto from 'crypto';
import dotenv from "dotenv";
// dotenv.config(__dirname+'/.env'); 
// console.log(process.env.MONGO_URL);
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//console.log(__dirname)
const pathdir=path.dirname(__dirname);
//console.log(pathdir);
const rootpath=path.dirname(pathdir);
//console.log(rootpath)
const envFilePath = path.join(rootpath, '/.env');
//console.log(envFilePath)
 dotenv.config({path:envFilePath}); 
 //console.log(process.env.MONGO_URL);
const client = new twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);

export const sendOtp = (contactNumber, otp) => {
  return client.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: contactNumber,
  });
};


 export const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};





