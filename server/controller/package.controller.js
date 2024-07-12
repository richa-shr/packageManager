import Package from '../model/package.model.js';
import User from '../model/user.model.js';
import moment from 'moment';
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
        //console.log(req.user);
     const registrationNumber=user.registrationNumber;
     console.log(registrationNumber)
     const yourPackages=await Package.find({registrationNumber});
     const formattedPackages = yourPackages.map(pkg => ({
      ...pkg._doc,
      dateOfArrival: moment(pkg.dateOfArrival).format('YYYY-MM-DD')
  }));
     if(!yourPackages)
     return res.status(400).json({mag:"packages not found"})
     console.log(yourPackages)
     res.status(200).json({yourPackages:formattedPackages});
    } catch (error) {
        res.status(500).json({error:error.msg});
    }
     


}