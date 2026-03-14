const db = require("../config/db");

exports.getAvailability = async (req, res) => {

 const parkingId = req.params.id;

 try {

  const result = await db.query(`
   SELECT
    p.spaces,
    COUNT(t.id) FILTER (WHERE t.exit_time IS NULL) AS occupied
   FROM parkings p
   LEFT JOIN tickets t ON t.parking_id = p.id
   WHERE p.id = $1
   GROUP BY p.spaces
  `,[parkingId]);

  const total = Number(result.rows[0].spaces);
  const occupied = Number(result.rows[0].occupied);
  const available = total - occupied;

  res.json({
   total,
   occupied,
   available
  });

 } catch (error) {

  console.error(error);
  res.status(500).json({ error: "Error obteniendo disponibilidad" });

 }


};