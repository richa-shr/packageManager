import Package from '../model/package.model.js';
import User from '../model/user.model.js';
export const newPackage=async(req,res)=>{
    const { studentName, registrationNumber, dateOfArrival } = req.body;
  try {
    const newPackage = new Package({ studentName, registrationNumber, dateOfArrival });
    await newPackage.save();
    res.json(newPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const getAllpackage=async(req,res)=>{
    try {
        const packages = await Package.find({ isTaken: false });
        res.json(packages);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
export const seeYourPackage=async(req,res)=>{
    try {
        const user=req.user;
     const registrationNumber=user.registrationNumber;
     const yourPackages=Package.find({registrationNumber});
     res.status(200).json({yourPackages});
    } catch (error) {
        res.status(500).json({error:error.msg});
    }
     


}