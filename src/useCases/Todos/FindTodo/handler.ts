import { DynamodbTodosRepository } from "../../../repositories/implementations/DynamodbTodosRepository";
import { FindTodoController } from "./FindTodoController";
import { FindTodoUseCase } from "./FindTodoUseCase";

const repository = new DynamodbTodosRepository();
const useCase = new FindTodoUseCase(repository);
const controller = new FindTodoController(useCase);

module.exports.handler = controller.handler;
