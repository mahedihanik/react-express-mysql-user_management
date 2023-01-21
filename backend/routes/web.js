import express from "express";
import {getUsers, Login, Logout, updateUserInfo, createUser, deleteUserInfo} from "../controllers/UsersController.js";
import { getSettingValueByKey,updateSettingValueByKey } from "../controllers/SettingController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/TokenController.js";
import Users from "../models/UserModel.js";
import Setting from "../models/SettingModel.js";
await Users.sync();
await Setting.sync();
const router = express.Router();


router.get('/users', verifyToken, getUsers);
// router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

router.post('/get_setting_value',getSettingValueByKey);
router.patch('/update_setting_value',updateSettingValueByKey);
router.post('/create_user',verifyToken,createUser);
router.patch('/update_user', verifyToken, updateUserInfo);
router.patch('/delete_user', verifyToken, deleteUserInfo);

export default router;