import { User } from "../models/User";

export async function create_user(name: string, email: string): Promise<User> {
  const newUser = await User.query().insert({
    name,
    email,
  });

  return newUser;
}

export async function getUsers() {
  return await User.query();
}
