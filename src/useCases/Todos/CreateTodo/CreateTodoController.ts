import { CreateTodoUseCase } from "./CreateTodoUseCase"

export class CreateTodoController {
  constructor(
    private createTodoUseCase: CreateTodoUseCase
  ) {}

  handler = async () => {
    await this.createTodoUseCase.execute({});

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