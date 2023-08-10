export class Todo {
  constructor(props: Todo) {
    Object.assign(this, props);
  }

  public readonly id?: string;
  public checked?: string;
  public description?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}