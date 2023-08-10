import { Todo } from "../../entities/Todo"
import { ITodosRepository } from "../ITodosRepository"
import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient()

export class DynamodbTodosRepository implements ITodosRepository {
  async save(todo: Todo): Promise<any> {
    await dynamoDb.put({
      TableName: 'todos',
      Item: todo
    })
  }
}