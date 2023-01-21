import { Sequelize } from "sequelize";
import db from "../config/DatabaseConfig.js";

const { DataTypes } = Sequelize;

const Setting = db.define('setting',{
    key:{
        type: DataTypes.STRING
    },
    value:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    active:{
        type: DataTypes.TINYINT
    }
},{
    freezeTableName:true
});

// (async () => {
//     await db.sync();
// })();

export default Setting;