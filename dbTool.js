const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');

const host = '127.0.0.1';
const user = 'root';
const password = 'password';
const database = 'IKEA_Traadfri';
const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});
sequelize.options.logging = false;

function getDataTabel() {
    return sequelize.define('IKEA_BULPS', {
        id: { 
            type: Sequelize.INTEGER,
            primaryKey: true, //Does also make it unique
            allowNull: false
        },
        Typenummer:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        SoftwareVersion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Lysintensitet:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Farve:{
            type: Sequelize.STRING,
            allowNull: false
        },
        On: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
}

exports.setupDatabase = async function () {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: host,
            user: user,
            password: password
        });

let queryCreateDatabase = `CREATE DATABASE IF NOT EXISTS ${database}`;
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
exports.setupDatabase();

/**
 * Function for creating the tables.
 * @returns {Promise<void>}
 */
exports.setupTables = async function () {
    let simpleDataTabel = getDataTabel();
    await simpleDataTabel.sync({force: false})
}
//For post with FORM pug/html
exports.createSimpleData = async function (id, typenummer, softwareVersion, name, lysintensitet, farve, on) {
    try {
        let propertiesTable = getDataTabel();

        let result = await propertiesTable.create({
            id: id,
            Typenummer: typenummer,
            SoftwareVersion: softwareVersion,
            Name: name,
            Lysintensitet: lysintensitet,
            Farve: farve,
            On: on
        });
        return result.dataValues.id; // Return the ID of the inserted row
    } catch (e) {
        throw e;
    }
};

exports.readAllData = async function () {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: host,
            user: user,
            password: password
        });
        let query = "SELECT * FROM ikea_traadfri.ikea_bulps";
        let result =  await connection.query(query);
        console.log(result[0]);
        
        return result[0];
    } catch (e) {
        throw e;
    }
};

exports.createBulp = async function (arrayD) {
    try {
        console.log(arrayD)
        let bulps = getDataTabel();
        let resultsArray = [];
        let result = await bulps.create({
            id: arrayD[0],
            Typenummer: arrayD[1],
            SoftwareVersion: arrayD[2],
            Name: arrayD[3],
            Lysintensitet: arrayD[4],
            Farve: arrayD[5],
            On: arrayD[6]
        });
        resultsArray.push(result.dataValues.id);
        return resultsArray; // Return an array containing all inserted IDs
    } catch (e) {
        throw e;
    }
};

exports.updateBulp = async function (array) {
    try {
        let data = getDataTabel();
        let resultsArray = [];
        let result = await data.update({
            Typenummer: array[1],
            SoftwareVersion: array[2],
            Name: array[3],
            Lysintensitet: array[4],
            Farve: array[5],
            On: array[6]
        }, {returning: true, where: {id: array[0]}});


        resultsArray.push(result.dataValues);
        console.log(resultsArray[0]);

        return resultsArray; // Return an array containing all inserted IDs
    } catch (e) {
        throw e;
    }
};