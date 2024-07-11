import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password: { type: String, required: true },
    enrollmentNumber:{
        type:String,
        required:true
    },
    registrationNumber:{
        type:String,
        
        required:true
    },
    contactNumber:{
        type:Number,
        required:true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit number!`
            }
    }

})
UserSchema.pre('save',async function(next){
 if(!this.isModified('password')) return next;
 const salt=await bcrypt.genSalt(10);
 this.password=await bcrypt.hash(String(this.password),salt);
 next();
})
UserSchema.methods.matchPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
const User=mongoose.model('User',UserSchema);
export default User;