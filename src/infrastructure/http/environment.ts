export abstract class HttpClientEnvironment {
  public abstract getBaseUrl(): string;
  public abstract getHeaders(): Promise<Record<string, string>>;
  public abstract logRequest(message: string): void;
}
