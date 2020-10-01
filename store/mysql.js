const config = require('../config')
const mysql = require('mysql')

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

//Connect
let connection;

function handleCon() {
    connection = mysql.createConnection(dbconf)

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err)
            setTimeout(handleCon, 2000)
        } else {
            console.log('DB connected')
        }
    })
    connection.on('error', err => {
        console.error('[db err]', err)
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon()
        } else {
            throw err
        }

    })
}

handleCon()

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        })
    })
}

const upsert = async (table, data) => {
    let row = []
    if (data.id) {
        row = await get(table, data.id)
    }

    if (row.length === 0) {
        return insert(table, data);
    } else {
        return update(table, data);
    }
}

function query(table, query, join) {
    let joinQuery = ''
    if (join) {
        const key = Object.keys(join)[0]
        const val = join[key]
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
    }
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, query, (error, result) => {
            if (error) return reject(error)

            let output = {
                id: result[0].id,
                username: result[0].username,
                password: result[0].password
            }

            resolve(output, null)
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query
}
