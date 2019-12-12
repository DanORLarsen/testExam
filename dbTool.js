const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');

const host = '127.0.0.1';
const user = 'root';
const password = 'password';
const database = 'myDB';
const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

function getDataTabel() {
    return sequelize.define('simpleData', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true, //Does also make it unique
            // Can be used if id cant be auto incremented allowNull: false, (if i use a string with unique activated)
            unique: true,
        },
        Name: {
            type: Sequelize.STRING
        }
    });
}

exports.setupDatabase = async function (host, user, password) {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: host,
            user: user,
            password: password
        });

        let queryCreateDatabase = "CREATE DATABASE IF NOT EXISTS myDB";
        await connection.query(queryCreateDatabase); // Create the database
    } catch (e) {
        console.log('throwing error in database')
        throw e;
    } finally {
        if (connection)
            connection.end();
        exports.setupTables();
    }
};
exports.setupDatabase(host, user, password);

/**
 * Function for creating the tables.
 * @returns {Promise<void>}
 */
exports.setupTables = async function () {
    let simpleDataTabel = getDataTabel();
    await simpleDataTabel.sync({force: false})
}
//For post with FORM pug/html
exports.createSimpleData = async function (idData, nameData) {
    try {
        let propertiesTable = getPropertiesTable();

        let result = await propertiesTable.create({
            id: idData,
            name: nameData
        });
        return result.dataValues.id; // Return the ID of the inserted row
    } catch (e) {
        throw e;
    }
};