import { Sequelize } from "sequelize";
import db from "../config/DatabaseConfig.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    name:{
        type: DataTypes.STRING
    },
    username:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
    image:{
        type: DataTypes.STRING
    },
    role:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});

export default Users;