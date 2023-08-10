import { ITodosRepository } from "../../../repositories/ITodosRepository";

export class ListTodoUseCase {
  constructor(
    private todoRepository: ITodosRepository
  ) {}

  async execute() {
    return await this.todoRepository.list();
  }
}