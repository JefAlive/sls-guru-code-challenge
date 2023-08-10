import { CreateTodoUseCase } from "./CreateTodoUseCase"
import { z } from "zod"

export class CreateTodoController {
  constructor(
    private createTodoUseCase: CreateTodoUseCase
  ) {}

  handler = async (event) => {
    const todoSchema = z.object({
      description: z.string()
        .min(1, { message: "Must be 1 or more characters long" })
        .max(255, { message: "Must be 255 or fewer characters long" })
    })
    const todo = todoSchema.parse(JSON.parse(event.body))

    await this.createTodoUseCase.execute(todo)

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