
import mongoose from "mongoose";
var schema = mongoose.Schema;
var objectId = schema.objectId;
const playlistSchema = schema({
    userid : {
        type: String,
        required : true
    },
    playlistName : {
         type : String,
         required : true,
    },
    songlist : [
        {
            songId : {
                 type : String,
                 required : true
            },
            songName : {
                 type: String,
                 required : true
            }
        }
    ]
})

const PlayList = mongoose.model('PlayList',playlistSchema);

export default PlayList;