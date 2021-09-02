import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../openDB";
import { sign } from "jsonwebtoken";
import { secret } from "../../../api/secret";
import cookie from "cookie";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise(async (resolve, reject) => {
    try {
      if (req.cookies.auth) {
        const db = await openDB();
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("auth", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 0,
            path: "/",
          })
        );
        return res.json({ message: "Logged Out" });
      } else {
        res.status(405).json({ message: "No Auth" });
      }
    } catch (err) {
      res.status(401).json({ message: "Something wrong with Logout" });
    }
  });
}
