export interface Decrypter {
  decode: (token: string) => Promise<Record<string, unknown>>;
}

export interface Encrypter {
  encode: (content: Record<string, string>) => Promise<string>;
}

export interface EncrypterVerify {
  verify: (token: string) => Promise<boolean>;
}

export interface HashComparer {
  compare: (plaitext: string, digest: string) => Promise<boolean>;
}

export interface Hasher {
  hash: (plaintext: string) => Promise<string>;
}
