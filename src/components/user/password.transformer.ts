import { hash, verify } from 'argon2'
import { randomBytes } from 'crypto'

// This method generates a argon hashed password and returns the salt and the hashed password
export const hashPassword = async (
  password: string
): Promise<{
  salt: Buffer
  hashed: string
}> => {
  const salt = randomBytes(32)
  const hashed = await hash(password, { salt })
  return { salt, hashed }
}

// This method verifies if the password stored in the db matches the one provider by the user
export const checkPassword = async (db_password: string, received_password: string): Promise<boolean> => {
  return await verify(db_password, received_password)
}
