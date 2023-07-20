import {Sequelize} from 'sequelize';

const db = new Sequelize('nodetypescriptusers', 'root', '', {
    host: "localhost",
    dialect : 'mysql',
    port:33069 //el puerto en xampp que indica mysql
  });

export default db;