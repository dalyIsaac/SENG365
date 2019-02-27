// @ts-check

const mysql = require("mysql");

const con = mysql.createConnection({
    host: "mysql3.csse.canterbury.ac.nz",
    user: "idd17",
    password: "85231671",
    database: "idd17"
});

// con.connect((err) => {
//     if (err) {
//         throw err;
//     }

//     con.query("SELECT * FROM lab2_users", (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log(result);
//     });
// });


con.connect((err) => {
    if (err) {
        throw err;
    }

    console.log("Connected!");
    const sql = "INSERT INTO lab2_users (username) VALUES ?";
    const values = [
        ["James"],
        ["Lotte"],
        ["Adrien"],
        ["Elske"],
        ["Alex"],
    ];
    con.query(sql, [values], (err, result) => {
        if (err) {
            throw err;
        }
        console.log("Number of records inserted: " + result.affectedRows);
    });
});
