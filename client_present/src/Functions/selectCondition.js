var mysql = require('mysql2');

let readFromTable = async (tableName, line, condition) => {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Ofakim123?",
            database: "userDB"
        });

        con.connect(function (err) {
            if (err) {
                reject(err); // Rejette la promesse en cas d'erreur de connexion
                return;
            }
            con.query(`SELECT * FROM ${tableName} WHERE ${line} = '${condition}'`, function (err, result, fields) {
                if (err) {
                    console.error(`Could not select from ${tableName} table`, err);
                    return;
                }
                con.end(); // Termine la connexion après la requête réussie
                resolve(result);
                //console.log(result);
                //console.log(fields);
            });
        });
    });
}

// Exemple d'utilisation de la fonction readFromTable avec async/await
async function fetchDataFromTableCondition(tableName, line, condition) {
    try {
        const data = await readFromTable(tableName, line, condition);
        console.log('data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

fetchDataFromTableCondition("Students", "name", 'Moshe'); // Appel de la fonction pour récupérer les données



//readFromTable("Students");
//console.log('readFromTable', readFromTable);
//console.log('fetchDataFromTable', fetchDataFromTable);

module.exports = { fetchDataFromTableCondition }