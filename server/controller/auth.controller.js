import User from '../model/user.model.js';
import jwt from 'jsonwebtoken';
export const registerUser=async(req,res)=>{
    try {
        const {name,email,password,enrollmentNumber,registrationNumber,contactNumber}=req.body;
        const existing=await User.findOne({registrationNumber});
        if(existing)
        return res.status(400).json({msg:"User already exists"});
        const newUser=await User.create({name,email,password,enrollmentNumber,registrationNumber,contactNumber});
        newUser.save();
        const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({msg:"User created successfully",data:newUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.msg});
    }
}
export const loginUser=async(req,res)=>{
    //const {email,password}=req.body();
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);   
        res.status(500).send('Server error');
    }

}