const express = require("express");

const mysql = require("mysql");

const cors = require("cors");

const app = express();

app.use(cors());

const bdd = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "alternance3",
});

app.get("/", (re, res) => {
    return res.json("Backend");
})

app.get("/citations", (req, res) => {
  const sql = "SELECT citation FROM citations;";
  bdd.query(sql, (err, data) => {
      if(err){
          return res.json(err);
      }else{
          return res.json(data);
      }
  })
});

app.listen(5555, () => {
    console.log("listening");
})