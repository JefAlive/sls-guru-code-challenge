import { CreateTodoUseCase } from "./CreateTodoUseCase"

export class CreateTodoController {
  constructor(
    private createTodoUseCase: CreateTodoUseCase
  ) {}

  handler = async (event) => {
    await this.createTodoUseCase.execute(JSON.parse(event.body))

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Created Todo."
        }
      )
    }
  }
}