import { EditTodoUseCase } from './EditTodoUseCase'

export class EditTodoController {
  constructor (
    private editTodoUseCase: EditTodoUseCase
  ) {}

  handler = async (event) => {
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
  }
}
