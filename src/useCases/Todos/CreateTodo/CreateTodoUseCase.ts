import { Todo } from '../../../entities/Todo'
import { ITodosRepository } from '../../../repositories/ITodosRepository'
import { ICreateTodoRequestDTO } from './CreateTodoDTO'
import { z } from 'zod'

export class CreateTodoUseCase {
  constructor (
    private todoRepository: ITodosRepository
  ) {}

  async execute (data: ICreateTodoRequestDTO) {
    const todoSchema = z.object({
      description: z.string()
        .min(1, { message: 'Must be 1 or more characters long' })
        .max(255, { message: 'Must be 255 or fewer characters long' })
    })
    const todo = new Todo(todoSchema.parse(data))
    await this.todoRepository.save(todo)
    return todo.id
  }
}
