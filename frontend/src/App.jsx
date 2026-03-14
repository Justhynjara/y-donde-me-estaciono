import { useState } from "react"
import axios from "axios"

function App() {

  const [plate, setPlate] = useState("")
  const [available, setAvailable] = useState(null)

  const ingresarVehiculo = async () => {
    try {

      await axios.post("http://localhost:3000/api/tickets/entry", {
        parking_id: 1,
        plate: plate
      })

      alert("Vehículo ingresado")

    } catch (error) {
      console.error(error)
      alert("Error al ingresar vehículo")
    }
  }

  const verDisponibilidad = async () => {
    try {

      const res = await axios.get(
        "http://localhost:3000/api/parking/1/availability"
      )

      setAvailable(res.data.available)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>Sistema de Estacionamiento</h1>

      <h2>Ingresar Vehículo</h2>

      <input
        placeholder="Patente"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
      />

      <button onClick={ingresarVehiculo}>
        Ingresar
      </button>

      <hr />

      <h2>Disponibilidad</h2>

      <button onClick={verDisponibilidad}>
        Ver espacios disponibles
      </button>

      {available !== null && (
        <h3>Espacios disponibles: {available}</h3>
      )}

    </div>
  )
}

export default App