import { openDB } from "../openDB";

export interface Model {
  model: string;
  count: number;
}

export async function getModels(make: string) {
  const db = await openDB();
  const mainQuery = `${
    make
      ? "SELECT model, count(*) as count FROM car WHERE make=@make GROUP BY model"
      : "SELECT model, count(*) as count FROM car GROUP BY model"
  }`;
  const model = await db.all<Model[]>(mainQuery, { "@make": make });
  return model;
}
