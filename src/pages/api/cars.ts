import { NextApiRequest, NextApiResponse } from "next";
import { getPaginatedCars } from "../../database/getPaginatedCars";

export default async function cars(req: NextApiRequest, res: NextApiResponse) {
  const cars = await getPaginatedCars(req.query);
  // const sleep = (time: number) => {
  //   return new Promise((res,rej) => {
  //     setTimeout(res,time)
  //   })
  // }
  // await sleep(2000)

  res.json(cars);
}
