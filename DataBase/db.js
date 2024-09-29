    import mongoose from 'mongoose'
import dotenv from 'dotenv';

// dotenv.config();
dotenv.config({ path: 'config.env' });
mongoose.set('strictQuery', true);
// import dotenv from 'dotenv';
// Password :1hBAl6UQSuc2KKOE
// mongodb+srv://awdheshkumarab98:<password>@cluster0.yxtyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// dotenv.config()
const db_url = process.env.DB_URL;
const connection =async()=>{
    // const URL="mongodb+srv://awdheshkumarab98:1hBAl6UQSuc2KKOE@cluster0.yxtyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const URL = db_url;
    try{
        await mongoose.connect(URL, {useNewUrlParser:true}) 
        console.log("Database connected successfully");
    }
    catch(err){
       console.log("there is some error in connecting database",err.message);
    }
}

export default connection; 