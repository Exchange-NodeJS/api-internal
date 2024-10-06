import * as crypto from "node:crypto";

/**
 * Hashes a password using PBKDF2.
 * @param {string} password The password to encrypt
 * @returns {[string, string]} First position: salt. Second position: password hashed
 */
export function hash_password(password: string): [string, string] {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000000, 64, "sha256")
    .toString("hex");

  return [salt, hash];
}

/**
 * Compares an input password with a stored hashed password.
 * @param {string} input - The password to check.
 * @param {string} stored_hash - The stored password hash.
 * @param {string} salt_stored - The salt stored with the user.
 * @returns {Promise<boolean>} Whether the passwords match.
 */
export function compare_password(
  input: string,
  stored_hash: string,
  salt_stored: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      input,
      salt_stored,
      1000000,
      64,
      "sha256",
      (err, derivedKey) => {
        if (err) return reject(err);

        const inputHash = derivedKey.toString("hex");
        resolve(stored_hash === inputHash);
      }
    );
  });
}
