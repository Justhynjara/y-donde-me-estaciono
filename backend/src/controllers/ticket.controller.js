const db = require("../config/db");

exports.vehicleEntry = async (req, res) => {
 try {

  const { parking_id, plate } = req.body;

  const result = await db.query(
   "INSERT INTO tickets(parking_id, plate) VALUES($1,$2) RETURNING *",
   [parking_id, plate]
  );

  res.json({
   message: "Vehículo ingresado",
   ticket: result.rows[0]
  });

 } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Error registrando entrada" });
 }
};
exports.vehicleExit = async (req, res) => {
 try {

  const { ticket_id } = req.body;

  const result = await db.query(
   `UPDATE tickets 
    SET exit_time = CURRENT_TIMESTAMP, status='closed'
    WHERE id=$1
    RETURNING *`,
   [ticket_id]
  );

  res.json({
   message: "Vehículo salió",
   ticket: result.rows[0]
  });

 } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Error registrando salida" });
 }
};