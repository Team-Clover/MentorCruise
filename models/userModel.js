import mongoose from 'mongoose';

const userschema = new mongoose.Schema(
    {
        _id: ObjectId,
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { enum: ["user", "mentor", "admin"] },
        
    },
    {timestamps: true}
)


const userModel = mongoose.model('user',userschema) || mongoose.models.user;
export default userModel;