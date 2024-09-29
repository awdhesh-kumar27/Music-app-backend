import SongList from "../models/song.js";
import multer from "multer";
import fs from "fs";
import path from "path";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import {ObjectId} from "mongoose";




export const AddSong = async(req,res)=>{
    // console.log(req);
    const file = new SongList({
        userId : req.userId,
        songName : req.file.originalname,
        songData : req.file.buffer,
        songContentType: req.file.mimetype
    });
   console.log("songs",file);
    try{
        await file.save();
        return res.status(200).json({message : "successfuly uploaded song"});
    }catch(error){
         return res.status(400).json({message : error.message})
    }
    // return res.status(200).json({message:"Successfully Registered "});
}

export const DeleteSong = async(req,res)=>{
    const songId = req.params.id;
    const id = songId.substring(1);
    // console.log(songId);
    try{
        const result = await SongList.findByIdAndDelete(id);
        return res.status(203).json({message:"Deleted successfully"});
    }catch(err){
         return res.status(404).json({message:err.message})
    }
}

export const RenameSong = (req,res)=>{
    res.send("Song renamed successfully");
}

export const GetAllSong = (req,res)=>{
    res.send(" get all song successfully");
}

export const HomeLists = async(req,res)=>{

        const userId = req.userId;
        try{
            const files = await SongList.find({userId:userId},{_id : 1,songName: 1});
            return res.status(200).json({ files ,message:"successfully fetched"})
        } catch(err){
            return res.status(400).json({message : err.message});
        }
}


export const GetSong = async(req,res)=>{
 
    const _Id = req.params.id;

    try{
       
         const id = _Id.substring(1);
        //  console.log(id);
        const files = await SongList.findById(id);
        // console.log(files); 
        return res.status(200).json({ files ,message:"successfully fetched"})
    } catch(err){
        return res.status(400).json({message : err.message});
    }
    
}