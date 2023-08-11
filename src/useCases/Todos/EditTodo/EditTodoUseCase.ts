import { Todo } from "../../../entities/Todo"
import { ITodosRepository } from "../../../repositories/ITodosRepository"
import { IEditTodoRequestDTO } from "./EditTodoDTO"
import { z } from "zod"

export class EditTodoUseCase {
  constructor(
    private todoRepository: ITodosRepository
  ) {}

  async execute(id: string, data: IEditTodoRequestDTO) {
    z.string()
      .uuid({ message: "Must be a valid UUID v4" })
      .parse(id);
    const todoSchema = z.object({
      description: z.string()
        .min(1, { message: "Must be 1 or more characters long" })
        .max(255, { message: "Must be 255 or fewer characters long" }),
      checked: z.boolean()
    })
    const todo = new Todo(todoSchema.parse(data), id);
    return await this.todoRepository.edit(id, todo);
  }
}