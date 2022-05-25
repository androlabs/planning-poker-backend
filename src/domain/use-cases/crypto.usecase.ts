export interface BcryptUseCase {
  hash(content: string): Promise<string>;
  compare(plainText: string, hash: string): Promise<boolean>;
}
