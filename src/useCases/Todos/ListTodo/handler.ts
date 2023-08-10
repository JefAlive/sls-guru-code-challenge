import { DynamodbTodosRepository } from "../../../repositories/implementations/DynamodbTodosRepository";
import { ListTodoController } from "./ListTodoController";
import { ListTodoUseCase } from "./ListTodoUseCase";

const repository = new DynamodbTodosRepository();
const useCase = new ListTodoUseCase(repository);
const controller = new ListTodoController(useCase);

module.exports.handler = controller.handler;
