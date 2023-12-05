const { v4: uuidv4 } = require('uuid');

class traveler {
    static getAll(connection, callback) {
        const sql = "SELECT * FROM traveler";
        connection.query(sql, callback);
    }

    static getByTravelerId(connection, traveler_id, callback) {
        const sql = "SELECT * FROM traveler WHERE traveler_id = ?";
        const values = [traveler_id];
        connection.query(sql, values, callback);
    }

    static create(connection, tour_id, contact_id, traveler_name, traveler_birth, traveler_id_number, traveler_gender,traveler_diet_habits, callback) {
        const sql = "INSERT INTO traveler (traveler_id, tour_id, contact_id, traveler_name, traveler_birth, traveler_id_number, traveler_gender,traveler_diet_habits) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const traveler_id = uuidv4();
        const values = [traveler_id, tour_id, contact_id, traveler_name, traveler_birth, traveler_id_number, traveler_gender,traveler_diet_habits];
        connection.query(sql, values, callback);
    }

    static update(connection, traveler_id, tour_id, contact_id, traveler_name, traveler_birth, traveler_id_number, traveler_gender,traveler_diet_habits, callback) {
        const sql = "UPDATE traveler SET tour_id = ?, contact_id = ?, traveler_name = ?, traveler_birth = ?, traveler_id_number = ?, traveler_gender = ?,traveler_diet_habits = ? WHERE traveler_id = ?";
        const values = [tour_id, contact_id, traveler_name, traveler_birth, traveler_id_number, traveler_gender,traveler_diet_habits, traveler_id];
        connection.query(sql, values, callback);
    }

    static delete(connection, traveler_id, callback) {
        const sql = "DELETE FROM traveler WHERE traveler_id = ?";
        const values = [traveler_id];
        connection.query(sql, values, callback);
    }
}


module.exports = traveler;