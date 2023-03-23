export abstract class LoggerAdapter {
  public abstract info(message: string): void;
  public abstract error(message: string): void;
}
