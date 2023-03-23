export abstract class ViewModel<Props, ViewState, ViewActions> {
  public abstract readonly viewState: ViewState;
  public abstract readonly viewActions: ViewActions;

  public abstract init(): void;
  public abstract update(props: Props): void;
  public abstract dispose(): void;
}
