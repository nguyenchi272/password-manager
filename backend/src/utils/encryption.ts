import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = crypto.scryptSync(process.env.ENCRYPT_SECRET!, "salt", 32);
const iv = crypto.randomBytes(16);

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decrypt = (hash: string) => {
  try {
    if (!hash.includes(":")) return hash;

    const [ivHex, encrypted] = hash.split(":");

    if (!ivHex || ivHex.length !== 32) return hash; // IV không hợp lệ

    const ivBuffer = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encrypted, "hex")),
      decipher.final(),
    ]);

    return decrypted.toString();
  } catch {
    return hash; // fallback
  }
};
