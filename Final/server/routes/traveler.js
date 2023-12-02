const express = require("express");
const router = express.Router();
const traveler = require("../models/traveler");

function travelerRoutes(connection) {
    router.get("/", async (req, res) => {
        traveler.getAll(connection, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(results);
            }
        });
    });

    router.get("/:traveler_id", async (req, res) => {
        const { traveler_id } = req.params;
        tour.getByTravelerId(connection, traveler_id, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(results);
            }
        });
    });

    router.post("/", async (req, res) => {
        // body-parser only handles JSON, need to convert form date to JSON first
        const { tour_id, contact_id, traveler_name, traveler_birth, traveler_id_number, traveler_gender,traveler_diet_habits } = req.body;    
        tour.create(connection, tour_id, contact_id, traveler_name, traveler_birth, traveler_id_number, traveler_gender,traveler_diet_habits, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(201).send("New traveler created");
            }
        });
    });

    router.put("/:traveler_id", async (req, res) => {
        const { traveler_id } = req.params;
        const { tour_id, contact_id, traveler_name, traveler_birth, traveler_id_number, traveler_gender,traveler_diet_habits } = req.body;
        tour.update(connection, traveler_id, tour_id, contact_id, traveler_name, traveler_birth, traveler_id_number, traveler_gender,traveler_diet_habits, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).send("traveler updated");
            }
        });
    });

    router.delete("/:traveler_id", async (req, res) => {
        const { traveler_id } = req.params;
        tour.delete(connection, traveler_id, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).send("traveler deleted");
            }
        });
    });
    
    return router;
}

module.exports = travelerRoutes;