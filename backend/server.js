const express = require("express");

const mysql = require("mysql");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const morgan = require("morgan");
app.use(morgan("combined"));

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
  const sql = "SELECT id, citation FROM citations ORDER BY id DESC;";
  bdd.query(sql, (err, data) => {
      if(err){
          return res.json(err);
      }else{
          return res.json(data);
      }
  })
});

app.post("/citations", (req, res) => {
    const { citation } = req.body;
    const sql = "INSERT INTO citations (citation) VALUES (?)";
    bdd.query(sql, [citation], (err, result) => {
        if (err) {
            return res.json(err);
        } else {
            return res.status(201).json("Citation ajoutée avec succès !");
        }
    });
});

app.delete("/citations/:idCitation", (req, res) => {
    const idCitation = req.params.idCitation;
    const sql = "DELETE FROM citations WHERE id = ?;";
    bdd.query(sql, [idCitation], (err) => {
       if(err){
           return res.json(err);
       }else{
           return res.status(201).json("Citation supprimée avec succès !");
       }
    });
});

app.put("/citations/:idCitation", (req, res) => {
    const idCitation = req.params.idCitation;
    const { citation } = req.body;

    const sql = "UPDATE citations set citation = ? WHERE id = ?;";
    bdd.query(sql, [citation, idCitation], (err) => {
       if(err){
           return res.json(err);
       }else{
           return res.status(201).json("Citation éditée avec succès !");
       }
    });
});

app.post("/favoris", (req, res) => {
    const { personnage, episode, citation } = req.body;

    const sql = "INSERT INTO favoris (personnage, episode, citation) VALUES (?, ?, ?)";
    bdd.query(sql, [personnage, episode, citation], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de l'insertion des données dans la base de données." });
        } else {
            return res.status(201).json("Citation ajoutée aux favoris avec succès !");
        }
    });
});




app.listen(5555, () => {
    console.log("listening");
})