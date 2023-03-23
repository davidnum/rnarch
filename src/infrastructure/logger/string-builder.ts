export class StringBuilder {
  private _printQueue: string[] = [];

  public appendDateTime(): StringBuilder {
    // this._printQueue.push(getDateTime());
    return this;
  }

  public appendTag(tag?: string): StringBuilder {
    if (tag) {
      this._printQueue.push(`[${tag}]`);
    }

    return this;
  }

  public appendMessage(message: string): StringBuilder {
    this._printQueue.push(message);
    return this;
  }

  public appendData(data?: Record<string, unknown>): StringBuilder {
    if (data) {
      this._printQueue.push(`| ${JSON.stringify(data)}`);
    }

    return this;
  }

  public build(): string {
    return this._printQueue.join(' ');
  }
}
