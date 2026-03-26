import mongoose from 'mongoose';

const dbConnect = async () =>{
     await mongoose.connect(`${process.env.MONGODB_URL}Mentors`,{})
     console.log('Connected to MongoDB')

}


export default dbConnect;