import { Todo } from "../entities/Todo";

export interface ITodosRepository {
  save(todo: Todo): Promise<any>;
  find(id: String): Promise<any>;
  list(): Promise<any>;
  edit(id:String, todo: Todo): Promise<any>;
  delete(id: String): Promise<any>;
}