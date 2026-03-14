import { useEffect, useState } from "react";
import { getAvailability } from "../services/api";

export default function ParkingStatus() {

 const [data, setData] = useState(null);

 const loadData = async () => {
  const res = await getAvailability(1);
  setData(res.data);
 };

 useEffect(() => {
  loadData();
 }, []);

 if(!data) return <h2>Cargando...</h2>;

 return (
  <div style={{textAlign:"center", marginTop:"50px"}}>
   <h1>Estacionamiento Mall Plaza</h1>

   <h2>Total: {data.total}</h2>
   <h2>Ocupados: {data.occupied}</h2>
   <h2>Disponibles: {data.available}</h2>

  </div>
 );

}