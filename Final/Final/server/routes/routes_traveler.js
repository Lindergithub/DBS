const express = require("express");
const router = express.Router();
const traveler = require("../models/models_traveler");
const tour = require("../models/models_tour");
const contact = require("../models/models_contact");

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
        traveler.getByTravelerId(connection, traveler_id, (err, results) => {
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
        const someCondition = "tour_name = 'Hiking Tour'";
        

        tour.findTourIdByCondition(connection, someCondition, (err, tourIdResult) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else{
                const tour_id = tourIdResult[0].tour_id;

                const contactCondition = "contact_name = 'ruth'";
                contact.findContactIdByCondition(connection, contactCondition, (contactErr, contactIdResult) => {
                    if (contactErr) {
                        console.error(contactErr);
                        res.status(500).send(contactErr);
                    } else {
                        const contact_id = contactIdResult[0].contact_id;
                        const { traveler_name, traveler_birth, traveler_id_number, traveler_gender,traveler_diet_habits } = req.body;    
                        traveler.create(connection, tour_id, contact_id, traveler_name, traveler_birth, traveler_id_number, traveler_gender,traveler_diet_habits, (err, results) => {
                            if (err){
                                console.error(err);
                                res.status(500).send(err);
                            } else {
                                res.status(201).send("New traveler created");
                            }
                        });
                    }});
            }
        });
    });

    router.put("/:traveler_id", async (req, res) => {
        const { traveler_id } = req.params;
        const { tour_id, contact_id, traveler_name, traveler_birth, traveler_id_number, traveler_gender,traveler_diet_habits } = req.body;
        traveler.update(connection, traveler_id, tour_id, contact_id, traveler_name, traveler_birth, traveler_id_number, traveler_gender,traveler_diet_habits, (err, results) => {
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
        traveler.delete(connection, traveler_id, (err, results) => {
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