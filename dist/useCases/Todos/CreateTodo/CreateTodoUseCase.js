"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/useCases/Todos/CreateTodo/CreateTodoUseCase.ts
var CreateTodoUseCase_exports = {};
__export(CreateTodoUseCase_exports, {
  CreateTodoUseCase: () => CreateTodoUseCase
});
module.exports = __toCommonJS(CreateTodoUseCase_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateTodoUseCase
});
