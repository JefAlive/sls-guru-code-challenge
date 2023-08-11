import { Todo } from "../entities/Todo";

export interface ITodosRepository {
  save(todo: Todo): Promise<any>;
  list(): Promise<any>;
}