import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(5);
  return bcrypt.hash(password, salt);
}

export async function camparePassword(password: string, hashPassword: string) {
  return bcrypt.compare(password, hashPassword);
}
