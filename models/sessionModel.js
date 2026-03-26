import mongoose from 'mongoose';


const sessionSchema = new mongoose.Schema({
    mentorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mentor'
    },
    menteeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    amount:{
        type: Number,
        required: true
    },
    payment:{
        type: Boolean,
        required: true,
        default: false,
    },
    paymentMethod:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
});

const sessionModel = mongoose.model('session',sessionSchema) || mongoose.models.session;
export default sessionModel;