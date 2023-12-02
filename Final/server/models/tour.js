const { v4: uuidv4 } = require('uuid');

class tour {
    static getAll(connection, callback) {
        const sql = "SELECT * FROM tour";
        connection.query(sql, callback);
    }

    static getByTourId(connection, tour_id, callback) {
        const sql = "SELECT * FROM tour WHERE tour_id = ?";
        const values = [tour_id];
        connection.query(sql, values, callback);
    }

    static create(connection, tour_name, tour_location, tour_departure_date, tour_departure_place, tour_min_size, tour_price, tour_days, tour_status, callback) {
        const sql = "INSERT INTO tour (tour_id, tour_name, tour_location, tour_departure_date, tour_departure_place, tour_min_size, tour_price, tour_days, tour_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const tour_id = uuidv4();
        const values = [tour_id, tour_name, tour_location, tour_departure_date, tour_departure_place, tour_min_size, tour_price, tour_days, tour_status];
        connection.query(sql, values, callback);
    }

    static update(connection, tour_id, tour_name, tour_location, tour_departure_date, tour_departure_place, tour_min_size, tour_price, tour_days, tour_status, callback) {
        const sql = "UPDATE tour SET  tour_name = ?, tour_location = ?, tour_departure_date = ?, tour_departure_place = ?, tour_min_size = ?, tour_price = ?, tour_days = ?, tour_status = ? WHERE tour_id = ?";
        const values = [tour_name, tour_location, tour_departure_date, tour_departure_place, tour_min_size, tour_price, tour_days, tour_status, tour_id];
        connection.query(sql, values, callback);
    }

    static delete(connection, tour_id, callback) {
        const sql = "DELETE FROM tour WHERE tour_id = ?";
        const values = [tour_id];
        connection.query(sql, values, callback);
    }
}


module.exports = tour;