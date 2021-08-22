import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { secret } from "../../../api/secret";
import { openDB } from "../../openDB";
export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    verify(req.cookies.auth, secret, async (err, decode) => {
      if (!err && decode) {
        const db = await openDB();
        const user = await db.get("SELECT * FROM User WHERE id = ?", [
          decode.sub,
        ]);
        return res.status(200).json({ user, message: "Welcome!" });
      }
      res.status(401).json({ message: "Something wrong with token!" });
    });
  } else {
    res.status(401).json({ message: "Only accet get request!" });
  }
}
