const express = require("express");
const ticketRoutes = require("./src/routes/ticket.routes");
const parkingRoutes = require("./src/routes/parking.routes");
const app = express();
app.use("/api/parking", parkingRoutes);
app.use(express.json());

app.use("/api/tickets", ticketRoutes);

const PORT = 3000;

app.listen(PORT, () => {
 console.log(`Servidor corriendo en puerto ${PORT}`);
});