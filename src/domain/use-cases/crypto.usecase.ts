export interface BcryptUseCase {
  perform(content: string): Promise<string>;
}
