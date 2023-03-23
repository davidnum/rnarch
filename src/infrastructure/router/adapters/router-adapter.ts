export abstract class RouterAdapter {
  public abstract bootstrap<Params>(params: Params): Promise<void>;

  public abstract registerComponent<Props extends {}>(
    componentName: string,
    componentProvider: () => React.ComponentType<Props>,
  ): void;

  public abstract setStackRoot<Props extends {}>(
    componentName: string,
    props: Props,
  ): void;

  public abstract push<Props extends {}>(
    componentName: string,
    props: Props,
  ): void;

  public abstract pop(): void;
}
