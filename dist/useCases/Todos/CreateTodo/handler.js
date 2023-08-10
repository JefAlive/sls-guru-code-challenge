"use strict";

// src/repositories/implementations/DynamodbTodosRepository.ts
var DynamodbTodosRepository = class {
  async save(todo) {
    throw new Error("Method not implemented.");
  }
};

// src/useCases/Todos/CreateTodo/CreateTodoController.ts
var CreateTodoController = class {
  constructor(createTodoUseCase) {
    this.createTodoUseCase = createTodoUseCase;
    this.handler = async () => {
      await this.createTodoUseCase.execute({});
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: "Created Todo."
          }
        )
      };
    };
  }
};

// src/entities/Todo.ts
var Todo = class {
  constructor(props) {
    Object.assign(this, props);
  }
};

// src/useCases/Todos/CreateTodo/CreateTodoUseCase.ts
var CreateTodoUseCase = class {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }
  async execute(data) {
    const todo = new Todo(data);
    await this.todoRepository.save({});
    return {};
  }
};

// src/useCases/Todos/CreateTodo/handler.ts
var repository = new DynamodbTodosRepository();
var useCase = new CreateTodoUseCase(repository);
var controller = new CreateTodoController(useCase);
module.exports.handler = controller.handler;
