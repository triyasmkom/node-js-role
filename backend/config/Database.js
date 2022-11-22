import {Sequelize} from "sequelize";

const db = new Sequelize(
    'role_db',
    'root',
    '12345',
    {host: "localhost", dialect:"mysql"}
);

export default db;