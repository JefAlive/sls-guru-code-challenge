import { DynamodbTodosRepository } from '../../../repositories/implementations/DynamodbTodosRepository'
import { CreateTodoController } from './CreateTodoController'
import { CreateTodoUseCase } from './CreateTodoUseCase'

const repository = new DynamodbTodosRepository()
const useCase = new CreateTodoUseCase(repository)
const controller = new CreateTodoController(useCase)

module.exports.handler = controller.handler
