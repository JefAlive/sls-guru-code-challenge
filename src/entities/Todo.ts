export class Todo {
  constructor(props: Todo) {
    Object.assign(this, props);
  }

  public readonly id?: string;
  public status?: string;
  public description?: string;
}