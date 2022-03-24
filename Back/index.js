var express = require("express");
var cors = require("cors");
var apiServer = express();
apiServer.use(cors());
var fs = require("fs");
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'zara.alessio.tave.osdb.it',
    user: 'c148_Alessio',
    database: 'c148_5AI_2021',
    password: 'Az-93532',
})
  
var host = "localhost";
var port = 5000;

var array = [];

apiServer.listen(port, host, ()=>{
    console.log("server ---> http://%s:%d", host, port)
})

apiServer.get("/api/result", (req , res) => {
    connection.query(
        'SELECT * FROM `result` ORDER BY nome ASC',
        function(err, results, fields) {
            if (results.length === 0) res.status(400).json({message: "log non effettuato"});
            else {
                res.status(200).json({message: results});
            }
        }
    );
})

apiServer.get("/api/Tab1", (req , res) => {
    connection.query(
        "INSERT INTO Tab1 (id, nome, quantitativo) VALUES (?,?,?);",
        [req.query.id, req.query.nome, req.query.quantitativo],
        function(err, results, fields) {
            console.log(err);
            if (err)  res.status(400).json({message: "reg non effettuato"});
            else res.status(200).json({message: "reg effettuato"}); 
        }
    );
})
