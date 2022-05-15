export interface LoggerContract {
  info(message: string): void;
  error(message: string, stack: unknown): void;
}
