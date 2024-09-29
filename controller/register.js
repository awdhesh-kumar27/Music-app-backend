import User from "../models/user.js";
import bcrypt from 'bcrypt'
import exp from 'constants';
import { Settoken,Gettoken } from './auth.js';


export const Register = async(req,res)=>{   
    var data = req.body;
    var password = data.password;
    // console.log(data);
     var newData = {"username" : data.username,"email":data.email,"name":data.name,"password": password,"phonenumber":data.phonenumber};
     var q1 = {"username" : data.username};
     var q2 = {"email":data.email};
     console.log("before",newData);

    var data = new User(newData);
    console.log("after",data);
    var status1 = await User.find(q1);
    var status2 = await User.find(q2);
    //  console.log(status1,status2,newData);


      if(Object.entries(status1).length >= 1 ){
          return res.status(200).json({message:"Username already exist "});
      }else if(Object.entries(status2).length >= 1 ){
           return res.status(200).json({message:"email already exist "});
      }else{
           var status = data.save();
           try{
            return res.status(200).json({message:"Successfully Registered "});
           } catch(error){
            return res.status(400).json({message:error.message});
           }
      }
//    res.send("User Register successfully");
}

export const Login = async(req,res)=>{
    var data = req.body;
    var req1 = {"username" : data.username};
    var req2 = {"email":data.email}
    var password = data.password;
    console.log(data);
    var user1 = await User.find(req1);
    var user2 = await User.find(req2);
    console.log(user1,user2);
    if(Object.entries(user1).length == 0 && Object.entries(user2).length == 0){
        return res.status(200).json({message:"User doesn't exist ",username:""});
    }
    if(Object.entries(user1).length == 1){
     // console.log(1);
       var user = user1;
    }else if(Object.entries(user2).length == 1){
       var user = user2;
       //  console.log(2);
    }else{
       return res.status(200).json({message:"User doesn't exist ",username:""});
    }
    
    // console.log(user[0].password,password);
    if(await bcrypt.compare(password,user[0].password)){
       user1 = {_id : user[0]._id,email : user[0].email};
       const token = Settoken(user1._id);
        console.log("token",token);
    //    res.header("Token", token, { expires: new Date((new Date()).getTime() + (10 * 8640)), httponly:true });
       return res.status(200).json({message:"Login Successfully as",token:token});
    }else{
       return res.status(400).json({message:"Incorrect Id or Password ",username:""});
    }
    
    res.send("User Login successfully");
}

export const LogOut = async(req,res)=>{
    res.send("User Logout successfully");
}

