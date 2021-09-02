import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../openDB";
import { sign } from "jsonwebtoken";
import { secret } from "../../../api/secret";
import cookie from "cookie";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(async (resolve, reject) => {
    try {
      if (req.method === "POST") {
        const db = await openDB();
        const user = await db.get("SELECT * FROM User WHERE email = ?", [
          req.body.email,
        ]);
        compare(req.body.password, user.password, function (err, result) {
          if (!err && result) {
            const claims = {
              sub: user.id,
              userName: user.name,
              userEmail: user.email,
            };
            const jwt = sign(claims, secret, {
              expiresIn: "1h",
            });
            res.setHeader(
              "Set-Cookie",
              cookie.serialize("auth", jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 3600,
                path: "/",
              })
            );
            return res.json({ message: "Welcome to the app!", user });
          }
          res.json({ message: "Something wrong" });
        });
      } else {
        res.status(405).json({ message: "Only Post Request will be Accepted" });
      }
    } catch (err) {
      res.status(401).json({ message: "Something wrong with Login" });
    }
  });
}
