const express = require("express");
const router = express.Router();
const tour = require("../models/tour");

function tourRoutes(connection) {
    router.get("/", async (req, res) => {
        tour.getAll(connection, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(results);
            }
        });
    });

    router.get("/:tour_id", async (req, res) => {
        const { tour_id } = req.params;
        tour.getByTourId(connection, tour_id, (err, results) => {
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
        const { tour_name, tour_location, tour_departure_date, tour_departure_place, tour_min_size, tour_price, tour_days, tour_status } = req.body;    
        tour.create(connection, tour_name, tour_location, tour_departure_date, tour_departure_place, tour_min_size, tour_price, tour_days, tour_status, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(201).send("New tour created");
            }
        });
    });

    router.put("/:tour_id", async (req, res) => {
        const { tour_id } = req.params;
        const { tour_name, tour_location, tour_departure_date, tour_departure_place, tour_min_size, tour_price, tour_days, tour_status } = req.body;
        tour.update(connection, tour_id, tour_name, tour_location, tour_departure_date, tour_departure_place, tour_min_size, tour_price, tour_days, tour_status, (err, results) => {
            if (err){
                console.error(err);
                res.status(555).send(err);
            } else {
                res.status(200).send("tour updated");
            }
        });
    });

    router.delete("/:tour_id", async (req, res) => {
        const { tour_id } = req.params;
        tour.delete(connection, tour_id, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).send("tour deleted");
            }
        });
    });
    
    return router;
}

module.exports = tourRoutes;