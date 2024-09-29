    import mongoose from 'mongoose'
    import dotenv from 'dotenv';


dotenv.config({ path: 'config.env' });
mongoose.set('strictQuery', true);

const db_url = process.env.DB_URL;
const connection =async()=>{
    
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
