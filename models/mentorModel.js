import mongoose from 'mongoose';

const mentorschema = new mongoose.Schema({
    name: { type: String, required: true },
    description:{ type: String, required: true },
    price:{ type: Number, required: true },
    image:{ type: String, required: true },
    category:{ type: String, required: true },
    rating:{ type: Number, required: true },
    //TODO info
    avilibility:{ type: String, required: true },
});


const mentorModel = mongoose.model('mentor',mentorschema) || mongoose.models.mentor;
export default mentorModel;