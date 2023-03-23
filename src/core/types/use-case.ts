export abstract class UseCase<Out, In = undefined> {
  public abstract execute(input: In): Promise<Out>;
}
