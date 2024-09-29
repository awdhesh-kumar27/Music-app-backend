
import mongoose from "mongoose";
// const multer = require('multer');
import multer from "multer";
import fs from "fs";
import path from "path";
// const fs = require('fs');
// const path = require('path');
var schema = mongoose.Schema;
var objectId = schema.objectId;
const songSchema = schema({
    userId : {
        type: String,
        required : false
    },
    songName : {
         type : String,
         required : true,
    },
    songData : {
         type : Buffer,
         required : true
    },
    songContentType : {
         type : String,
         require : true
    }

})

const SongList = mongoose.model('SongList',songSchema);

export default SongList;