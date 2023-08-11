import { Todo } from '../entities/Todo'

export interface ITodosRepository {
  save(todo: Todo): Promise<any>;
  find(id: string): Promise<any>;
  list(): Promise<any>;
  edit(id:string, todo: Todo): Promise<any>;
  delete(id: string): Promise<any>;
}
