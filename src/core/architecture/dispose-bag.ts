type Dispose = () => void;

export class DisposeBag {
  private bag: Dispose[] = [];

  public add(dispose: Dispose) {
    this.bag.push(dispose);
  }

  public dispose() {
    this.bag.forEach(dispose => dispose());
    this.bag = [];
  }
}
