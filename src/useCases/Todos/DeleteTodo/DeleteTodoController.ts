import { DeleteTodoUseCase } from './DeleteTodoUseCase'

export class DeleteTodoController {
  constructor (
    private deleteTodoUseCase: DeleteTodoUseCase
  ) {}

  handler = async (event) => {
    const todo = await this.deleteTodoUseCase.execute(event.pathParameters?.id)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Deleted Todo.'
      })
    }
  }
}
