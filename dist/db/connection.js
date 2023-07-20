"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('nodetypescriptusers', 'root', '', {
    host: "localhost",
    dialect: 'mysql',
    port: 33069 //el puerto en xampp que indica mysql
});
exports.default = db;
//# sourceMappingURL=connection.js.map