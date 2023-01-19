import {Sequelize} from "sequelize";

const DB = new Sequelize('user_management', 'sammy', 'password', {
    host: "localhost",
    dialect: "mysql"
});

export default DB;