const mysql = require('mysql');

const connections = mysql.createPool({
    connectionLimit: 1000,
    host: "localhost",
    user: "root",
    password: "",
    database: "dynamicInputBox",
});

export default connections;
