import { DynamodbTodosRepository } from '../../../repositories/implementations/DynamodbTodosRepository'
import { DeleteTodoController } from './DeleteTodoController'
import { DeleteTodoUseCase } from './DeleteTodoUseCase'

const repository = new DynamodbTodosRepository()
const useCase = new DeleteTodoUseCase(repository)
const controller = new DeleteTodoController(useCase)

module.exports.handler = controller.handler
