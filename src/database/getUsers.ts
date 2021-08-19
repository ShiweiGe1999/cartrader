import { openDB } from "../openDB";
import { UserModel } from "../../api/User";

export async function getUsers() {
  const db = await openDB();
  const users = await db.all<UserModel[]>("SELECT id, email, name, password FROM User");
  return users;
}
