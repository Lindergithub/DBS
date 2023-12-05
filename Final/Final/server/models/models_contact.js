//models_contact.js
const { v4: uuidv4 } = require('uuid');

class contact {
    static findContactIdByCondition(connection, condition, callback) {
        const sql = "SELECT contact_id FROM contact WHERE " + condition;
        connection.query(sql, callback);
    }

    static getAll(connection, callback) {
        const sql = "SELECT * FROM contact";
        connection.query(sql, callback);
    }

    static getByContactId(connection, contact_id, callback) {
        const sql = "SELECT * FROM contact WHERE contact_id = ?";
        const values = [contact_id];
        connection.query(sql, values, callback);
    }

    static create(connection, contact_name, contact_phone, contact_email, contact_address, contact_line_id, callback) {
        const sql = "INSERT INTO contact (contact_id, contact_name, contact_phone, contact_email, contact_address, contact_line_id) VALUES (?, ?, ?, ?, ?, ?)";
        const contact_id = uuidv4();
        const values = [contact_id, contact_name, contact_phone, contact_email, contact_address, contact_line_id];
        connection.query(sql, values, callback);
    }

    static update(connection, contact_id, contact_name, contact_phone, contact_email, contact_address, contact_line_id, callback) {
        const sql = "UPDATE contact SET contact_name = ?, contact_phone = ?, contact_email = ?, contact_address = ?, contact_line_id = ? WHERE contact_id = ?";
        const values = [contact_name, contact_phone, contact_email, contact_address, contact_line_id, contact_id];
        connection.query(sql, values, callback);
    }

    static delete(connection, contact_id, callback) {
        const sql = "DELETE FROM contact WHERE contact_id = ?";
        const values = [contact_id];
        connection.query(sql, values, callback);
    }
}


module.exports = contact;