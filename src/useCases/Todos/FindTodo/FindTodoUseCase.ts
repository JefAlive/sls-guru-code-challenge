import { ITodosRepository } from '../../../repositories/ITodosRepository'
import { z } from 'zod'

export class FindTodoUseCase {
  constructor (
    private todoRepository: ITodosRepository
  ) {}

  async execute (id: string) {
    z.string()
      .uuid({ message: 'Must be a valid UUID v4' })
      .parse(id)
    return await this.todoRepository.find(id)
  }
}
