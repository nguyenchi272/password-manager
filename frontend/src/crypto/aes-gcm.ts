export async function encryptAESGCM(key: CryptoKey, data: Uint8Array) {
const iv = crypto.getRandomValues(new Uint8Array(12))
const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data)
return { iv, encrypted }
}


export async function decryptAESGCM(key: CryptoKey, iv: Uint8Array, ciphertext: ArrayBuffer) {
return crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext)
}