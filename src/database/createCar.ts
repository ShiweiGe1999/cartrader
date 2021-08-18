import { openDB } from "../openDB";
import { CarModel } from "../../api/Car";

export async function createCar(car: CarModel) {
  const db = await openDB();
  const carparam: {
    [keys: string]: any | undefined;
  } = {};
  for (let [k, v] of Object.entries(car)) {
    carparam[`@${k}`] = v;
  }
  await db.run(
    "INSERT INTO Car (make, model, year, kilometers, fuelType, price, photoUrl, details) values(@make, @model,@year, @kilometers, @fuelType, @price, @photoUrl, @details)",
    carparam
  );
  console.log(await db.all("SELECT * FROM car"))
}
