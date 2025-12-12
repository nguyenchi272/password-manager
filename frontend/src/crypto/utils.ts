export function randomBytes(len: number) {
return crypto.getRandomValues(new Uint8Array(len))
}


export const encode = (str: string) => new TextEncoder().encode(str)
export const decode = (buf: Uint8Array) => new TextDecoder().decode(buf)