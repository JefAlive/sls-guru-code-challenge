import { ZodError } from 'zod'
import { EditTodoUseCase } from './EditTodoUseCase'

export class EditTodoController {
  constructor (
    private editTodoUseCase: EditTodoUseCase
  ) {}

  handler = async (event) => {
    try {
      await this.editTodoUseCase.execute(
        event.pathParameters?.id,
        JSON.parse(event.body)
      )
      
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Edited Todo.'
          }
        )
      }
    } catch(error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: JSON.stringify(error)
        }
      }
      throw error
    }
  }
}
