import { DynamodbTodosRepository } from '../../../repositories/implementations/DynamodbTodosRepository'
import { EditTodoController } from './EditTodoController'
import { EditTodoUseCase } from './EditTodoUseCase'

const repository = new DynamodbTodosRepository()
const useCase = new EditTodoUseCase(repository)
const controller = new EditTodoController(useCase)

module.exports.handler = controller.handler
export default controller.handler