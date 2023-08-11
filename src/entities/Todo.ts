import { v4 as uuid } from "uuid";

export class Todo {
  constructor(props: Omit<Todo, "id">, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuid();
    }
  }

  public readonly id?: string;
  public checked?: string;
  public description?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}