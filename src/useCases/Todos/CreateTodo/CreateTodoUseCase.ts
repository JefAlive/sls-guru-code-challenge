import { Todo } from "../../../entities/Todo";
import { ITodosRepository } from "../../../repositories/ITodosRepository";
import { ICreateTodoRequestDTO } from "./CreateTodoDTO";

export class CreateTodoUseCase {
  constructor(
    private todoRepository: ITodosRepository
  ) {}

  async execute(data: ICreateTodoRequestDTO) {
    const todo = new Todo(data);
    return await this.todoRepository.save(todo);
  }
}