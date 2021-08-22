import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../openDB";
import { getUsers } from "../../database/getUsers";
import { hash } from "bcrypt";
export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise((resolve, reject) => {
    if (req.method === "POST") {
      hash(req.body.password, 12, async function (err, hash) {
        const db = await openDB();
        const statement = await db.prepare(
          "INSERT INTO User (name, email, password) values(?,?,?)"
        );
        const name = req.body.firstName + " " + req.body.lastName;
        const result = await statement.run(name, req.body.email, hash);
        const users = await getUsers();
        res.json(users);
        resolve(users);
      });
    } else {
      res.status(405).json({ message: "Only Post Request will be Accepted" });
      resolve("Error");
    }
  });
}
