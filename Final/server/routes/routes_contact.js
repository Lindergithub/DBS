//routes_contact.js
const express = require("express");
const router = express.Router();
const contact = require("../models/models_contact");

function contactRoutes(connection) {
    router.get("/", async (req, res) => {
        contact.getAll(connection, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(results);
            }
        });
    });

    router.get("/:contact_id", async (req, res) => {
        const { contact_id } = req.params;
        contact.getByContactId(connection, contact_id, (err, results) => {
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
        const { contact_name, contact_phone, contact_email, contact_address, contact_line_id } = req.body;    
        contact.create(connection, contact_name, contact_phone, contact_email, contact_address, contact_line_id, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(201).send("New contact created");
            }
        });
    });

    router.put("/:contact_id", async (req, res) => {
        const { contact_id } = req.params;
        const { contact_name, contact_phone, contact_email, contact_address, contact_line_id } = req.body;
        contact.update(connection, contact_id, contact_name, contact_phone, contact_email, contact_address, contact_line_id, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).send("contact updated");
            }
        });
    });

    router.delete("/:contact_id", async (req, res) => {
        const { contact_id } = req.params;
        contact.delete(connection, contact_id, (err, results) => {
            if (err){
                console.error(err);
                res.status(500).send(err);
            } else {
                res.status(200).send("contact deleted");
            }
        });
    });
    
    return router;
}

module.exports = contactRoutes;