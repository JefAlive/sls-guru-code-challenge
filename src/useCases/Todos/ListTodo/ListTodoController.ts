import { ListTodoUseCase } from "./ListTodoUseCase"

export class ListTodoController {
  constructor(
    private listTodoUseCase: ListTodoUseCase
  ) {}

  handler = async () => {
    const todos = await this.listTodoUseCase.execute()

    return {
      statusCode: 200,
      body: JSON.stringify(todos)
    }
  }
}