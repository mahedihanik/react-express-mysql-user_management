# User Management Frontend And Backend
## Backend (Node ,Express, MySQL)
### Dependency Packages :
1. Express
2. Mysql2
3. Sequelize ORM
4. Jsonwebtoken
5. Bcrypt
6. Cookie-parser
7. Dotenv
8. Cors

#### Please install Node and NPM globally :

Node Version : 14.21.2\
NPM Version  : 6.14.17

#### For install dependencies run (ignore if downloaded from drive) :
### `npm init -y`
### `npm install express mysql2 sequelize jsonwebtoken bcrypt cookie-parser dotenv cors`
### `npm install -g nodemon`

#### Database setup :
### `Go to backend/config/DatabaseConfig.js add your database config in bellow code:`

const DB = new Sequelize('dbname_here', 'dbusername_here', 'dbpassword_here', {
host: "dbhostname_here",
dialect: "mysql"
});

#### For run project with nodemon run command (PORT : localhost:5000):
### `nodemon index`
After run this command Sequelize help you to create Users and Setting table automatically. You just need to run insert sql command for dummy data from SQL file which I already provided.

For user table dummy data run sql :

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `refresh_token`, `image`, `role`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Mahedi Hasan Anik', 'mahedihanik', 'mahedi.h.anik@gmail.com', '$2a$12$DQNBojiiUwTiXuSiL.PNmOd2dQGrO.WqOvBr337tfR75/pBBRfPLa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJNYWhlZGkgSGFzYW4gQW5payIsImVtYWlsIjoibWFoZWRpLmguYW5pa0BnbWFpbC5jb20iLCJzdGF0dXMiOiJhY3RpdmUiLCJpYXQiOjE2NzQyNzIyNjMsImV4cCI6MTY3NDM1ODY2M30.btFZzpCO_S7R0owypPZ4unL3VNs2MfXvLSWxU3xipwg', NULL, 'admin', 'active', '2023-01-21 01:50:48', '2023-01-21 05:21:37'),
(2, 'Sakib Nisat Alok', 'sakibnalok', 'sakib.n.alok@gmail.com', '$2a$12$DQNBojiiUwTiXuSiL.PNmOd2dQGrO.WqOvBr337tfR75/pBBRfPLa', NULL, NULL, 'user', 'active', '2023-01-21 01:50:48', '2023-01-21 05:17:35'),
(3, 'Alok Hosen', NULL, 'alok@gmail.com', '$2a$12$DQNBojiiUwTiXuSiL.PNmOd2dQGrO.WqOvBr337tfR75/pBBRfPLa', NULL, NULL, 'admin', 'inactive', '2023-01-21 04:47:03', '2023-01-21 05:18:40');

For setting table dummy data run sql :

INSERT INTO `setting` (`id`, `key`, `value`, `description`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 'login_attempt_count', '0', 'login attempt mode', 1, '2023-01-20 23:19:45', '2023-01-21 03:37:42');

#### Login Password : asl123

## Frontend (React)

Version : 18.0 +

Run:
### `npm start`
