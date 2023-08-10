import { Todo } from "../../entities/Todo";
import { ITodosRepository } from "../ITodosRepository";

export class DynamodbTodosRepository implements ITodosRepository {
  async save(todo: Todo): Promise<any> {
    throw new Error("Method not implemented.");
  }
}