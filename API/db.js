// require for mysql2
const mysql = require('mysql2/promise');
//export our db module
module.exports = db = {};
//call the function connection to make the connection with our db
connection();

async function connection() {
    //write the connection string for our db called Eventor
    let dbconnection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ayaxda11',
        database:'eventor'
    })
    //store the result of connection to module export for returning it to index.js to use it there
    db.connection = dbconnection;
}
