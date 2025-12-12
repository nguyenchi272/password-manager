export async function deriveKey(password: string) {
const enc = new TextEncoder().encode(password)
const keyMaterial = await crypto.subtle.importKey('raw', enc, 'PBKDF2', false, ['deriveKey'])
return crypto.subtle.deriveKey(
{ name: 'PBKDF2', salt: new TextEncoder().encode('pm-salt'), iterations: 100000, hash: 'SHA-256' },
keyMaterial,
{ name: 'AES-GCM', length: 256 },
false,
['encrypt', 'decrypt']
)
}