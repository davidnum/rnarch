export class StringBuilder {
  private printQueue: string[] = [];

  public appendDateTime(): StringBuilder {
    // this._printQueue.push(getDateTime());
    return this;
  }

  public appendTag(tag?: string): StringBuilder {
    if (tag) {
      this.printQueue.push(`[${tag}]`);
    }

    return this;
  }

  public appendMessage(message: string): StringBuilder {
    this.printQueue.push(message);
    return this;
  }

  public appendData(data?: Record<string, unknown>): StringBuilder {
    if (data) {
      this.printQueue.push(`| ${JSON.stringify(data)}`);
    }

    return this;
  }

  public build(): string {
    return this.printQueue.join(' ');
  }
}
