import Users from "../models/UserModel.js";
import Setting from "../models/SettingModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            where:{
                status:'active'
            },
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const updateUserInfo = async (req,res) => {
     //res.json(req.body.name)
    try {
        const updateUserValue = await Users.update(
            {
                name:req.body.name,
                email:req.body.email,
                status:req.body.status,
                role:req.body.role
            },
            {
                where:{
                    id:req.body.id
                }
            })
        res.json(updateUserValue)
    }catch (error){
        console.log(error)
    }
}
export const deleteUserInfo = async (req,res) => {
    //res.json(req.body.id)
    try {
        const deleteUserValue = await Users.update(
            {
                status:'inactive',
            },
            {
                where:{
                    id:req.body.id
                }
            })
        res.json(deleteUserValue)
    }catch (error){
        console.log(error)
    }
}

export const createUser = async(req, res) => {
    const { name, email, userName, password, role, status} = req.body;
    //res.json(name);
    // if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            userName: userName,
            password: hashPassword,
            role: role,
            status: status
        });
        res.json({msg: "User Created Successfully"});
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {

    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const settingValue = await Setting.findOne({
            where:{
                key:'login_attempt_count'
            }
        });

        const match = await bcrypt.compare(req.body.password, user[0].password);
        console.log(settingValue.value)
        if(!match) return res.status(400).json({msg: "Incorrect Password !"});
        if( parseInt(settingValue.value) === 4) return res.status(400).json({msg: "Your account is locked, please contact with Administrator !"});
        await Setting.update(
            {
                value:0
            },
            {
                where:{
                    key:'login_attempt_count'
                }
        });
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const status = user[0].status;
        const role = user[0].role;
        const accessToken = jwt.sign({userId, name, email,status}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, email,status}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Incorrect User Email !"});
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}