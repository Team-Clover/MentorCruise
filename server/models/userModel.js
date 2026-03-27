import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userschema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { enum: ["user", "mentor", "admin"] },
        
    },
    {timestamps: true}
)

userschema.methods.comparerPassword = async function (password){
    return bcrypt.compareSync(password, this.password);
}
userschema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET,{expiresIn:"24h"});
    return token;
};


userschema.static.hashPassword = async function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};


const userModel = mongoose.model('user',userschema) || mongoose.models.user;
export default userModel;