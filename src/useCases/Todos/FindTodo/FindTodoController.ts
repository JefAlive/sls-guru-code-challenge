import { FindTodoUseCase } from './FindTodoUseCase'

export class FindTodoController {
  constructor (
    private findTodoUseCase: FindTodoUseCase
  ) {}

  handler = async (event) => {
    try {
      const todo = await this.findTodoUseCase.execute(event.pathParameters?.id)

      return {
        statusCode: 200,
        body: JSON.stringify(todo)
      }
    } catch(error: any) {
      console.error('Veja o erro: ' + JSON.stringify(error))
      if (error?.message === 'not found') {
        return {
          statusCode: 404,
          error: 'Not found.'
        }
      }
      throw error
    }
  }
}
