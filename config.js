module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'sql3.freemysqlhosting.net',
        user: process.env.MYSQL_USER || 'sql3368151',
        password: process.env.MYSQL_PASS || 'NhcdFUbi2B',
        database: process.env.MYSQL_DB || 'sql3368151'
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    }
}