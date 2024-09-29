import Playlist from "../models/playlist.js";
import SongList from "../models/song.js";


export const CreatePlaylist = async(req,res)=>{
    // console.log("create playlist ok");
    // console.log(req);
    const newPlaylist = new Playlist({
        userid : req.userId,
        playlistName : req.body.playlistName,
        SongList: req.body.songList
    });

    // console.log("new playlist : ",newPlaylist);

    try{
        await newPlaylist.save();
        return res.status(201).json({message : "Playlist created song successfully"});
    }catch(error){
         return res.status(400).json({message : error.message})
    }
}

export const AddSongToPlaylist = async(req,res)=>{
    const playlistId = req.params.id
    const id = playlistId.substring(1);
    const songs = req.body.songList;
    // console.log(songs);
    try{
        const playlist = await Playlist.findById(id);

        // playlist.songlist.push(...songs);
        const newSongs = songs.filter(song => 
            !playlist.songlist.some(existingSong => existingSong.songId === song.songId)
          );
      
          // Add the new songs to the playlist
        //   console.log(newSongs);
          playlist.songlist.push(...newSongs);
        // Save the updated playlist
        const result =  await playlist.save();
        // console.log(playlist);
        return res.status(201).json({message : "Songs added successfully to playlist"});
    }catch(err){
            return res.status(400).json({message:err.message});
    }
}

export const DeletePlaylist = async(req,res)=>{
    const playlistId = req.params.id;
    // console.log(playlistId);
    const id = playlistId.substring(1);
    try{
        const result = await Playlist.findByIdAndDelete(id);
        return res.status(203).json({message:"Deleted successfully"});
    }catch(err){
         return res.status(404).json({message:err.message})
    }
   
}

export const GetAllPlaylist = async(req,res)=>{
    const userId = req.userId;
    // console.log(userId);
    try{
        const files = await Playlist.find({userid:userId},{_id : 1,playlistName: 1});
   
        return res.status(200).json({ files ,message:"successfully fetched"})
    } catch(err){
        return res.status(400).json({message : err.message});
    }
    // res.send("Get all Playlist  successfully");   
}


export const  PlayListSongs = async(req,res)=>{
    // console.log(req.params.id);
    const playlistid = req.params.id;
    const id = playlistid.substring(1);
    try{
        const files = await Playlist.findById(id);;
        // console.log(files.playlistName);
        return res.status(200).json({ songsList : files.songlist, playListName : files.playlistName ,message:"successfully fetched"})
    } catch(err){
        return res.status(400).json({message : err.message});
    }

}


export const RemoveSong = async(req,res)=>{
    // console.log(req.query);
    const playlistId  = req.query.id1;
    const songId = req.query.id2;

    try{
        const playlist = await Playlist.findById(playlistId);
        playlist.songlist = playlist.songlist.filter(song => song.songId !== songId);
        const result  = await playlist.save();
        return res.status(200).json({ message:"Song removed from playlist successfully"});
    }catch(err){
        return res.status(400).json({message : err.message});
    }
    
}