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

bdd.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données : ", err);
    } else {
        console.log("Connexion à la base de données réussie !");
    }
});

app.get("/", (req, res) => {
    return res.json("Backend");
});

app.get("/citations", (req, res) => {
    const sql = "SELECT id, citation FROM citations ORDER BY id DESC;";
    bdd.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
});

app.get("/citations/random", (req, res) => {
    const sql = "SELECT id, citation FROM citations ORDER BY RAND() LIMIT 1;";
    bdd.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            if (data.length === 0) {
                return res.json("Aucune citation !");
            } else {
                const citation = {
                    citation: data[0].citation,
                    infos: {
                        auteur: null,
                        acteur: null,
                        personnage: null,
                        saison: null,
                        episode: null,
                    },
                };
                return res.json(citation);
            }
        }
    });
});

app.post("/citations", (req, res) => {
    const {citation} = req.body;
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
        if (err) {
            return res.json(err);
        } else {
            return res.status(201).json("Citation supprimée avec succès !");
        }
    });
});

app.put("/citations/:idCitation", (req, res) => {
    const idCitation = req.params.idCitation;
    const {citation} = req.body;

    const sql = "UPDATE citations SET citation = ? WHERE id = ?;";
    bdd.query(sql, [citation, idCitation], (err) => {
        if (err) {
            return res.json(err);
        } else {
            return res.status(201).json("Citation éditée avec succès !");
        }
    });
});

app.post("/favoris", (req, res) => {
    const {personnage, episode, citation} = req.body;

    const sql = "INSERT INTO favoris (personnage, episode, citation) VALUES (?, ?, ?)";
    bdd.query(sql, [personnage, episode, citation], (err, result) => {
        if (err) {
            return res.status(500).json({error: "Erreur lors de l'insertion des données dans la base de données."});
        } else {
            return res.status(201).json("Citation ajoutée aux favoris avec succès !");
        }
    });
});

app.get("/favoris", (req, res) => {
    const sql = "SELECT id, personnage, episode, citation FROM favoris ORDER BY id DESC;";
    bdd.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
});

app.delete("/favoris/:idFavoris", (req, res) => {
    const idFavoris = req.params.idFavoris;
    const sql = "DELETE FROM favoris WHERE id = ?";
    bdd.query(sql, [idFavoris], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.status(201).json("La citation en favoris a bien été supprimée !");
        }
    });
});
app.listen(5555, () => {
    console.log("listening");
});
