import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getUsers } from "../../database/getUsers";
import { verify } from "jsonwebtoken";
import { secret } from "../../../api/secret";
export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(req.cookies.auth!, secret, async function (err, decoded) {
      if (!err && decoded) {
        return await fn(req, res);
      }
      res.status(500).json({ message: "Sorry you are not authenticated" });
    });
  };
export default authenticated(async function users(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await getUsers();
  res.json(users);
});
