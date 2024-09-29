import express from 'express';
import multer from "multer";
import { Authorization } from '../middleware/middlewareAuth.js';

import { LogOut,Login,Register } from "../controller/register.js";
import { AddSong,DeleteSong,RenameSong, GetAllSong,HomeLists,GetSong} from "../controller/songs.js";
import { CreatePlaylist, DeletePlaylist,AddSongToPlaylist,GetAllPlaylist,PlayListSongs,RemoveSong} from "../controller/playlist.js";
import PlayList from '../models/playlist.js';
// import { route } from "express/lib/application";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express();

router.post("/Register",Register);
router.post("/Login",Login);
router.post("/logout",LogOut);
router.get("/songs",Authorization,GetAllSong);
router.get("/playlist",Authorization,GetAllPlaylist);
router.get("/Home",Authorization,HomeLists);
// router.get("/song:id",PlaySong);
router.post("/AddSong",Authorization,upload.single('file'),AddSong);
router.get("/Home/song/:id",Authorization, GetSong);
// router.post("/RenameSong",Authorization,RenameSong);
router.get("/CurrentPlaylist/:id",Authorization,PlayListSongs);
router.delete("/DeleteSong/:id",Authorization,DeleteSong);
router.post("/CreatePlaylist",Authorization,CreatePlaylist);
router.patch("/RemoveSong",Authorization,RemoveSong);
router.delete("/DeletePlaylist/:id",Authorization,DeletePlaylist);
router.post("/AddSongPlaylist/:id",Authorization,AddSongToPlaylist);

export default router;