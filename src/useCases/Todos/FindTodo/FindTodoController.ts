import { FindTodoUseCase } from './FindTodoUseCase'

export class FindTodoController {
  constructor (
    private findTodoUseCase: FindTodoUseCase
  ) {}

  handler = async (event) => {
    const todo = await this.findTodoUseCase.execute(event.pathParameters?.id)

    return {
      statusCode: 200,
      body: JSON.stringify(todo)
    }
  }
}
