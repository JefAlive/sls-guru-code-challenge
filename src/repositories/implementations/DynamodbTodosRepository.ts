import { Todo } from "../../entities/Todo"
import { ITodosRepository } from "../ITodosRepository"
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

let options = {};
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://0.0.0.0:8000',
    credentials: {
      accessKeyId: 'MockAccessKeyId',
      secretAccessKey: 'MockSecretAccessKey'
    }
  }
}
const client = new DynamoDBClient(options)
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    convertClassInstanceToMap: true,
    removeUndefinedValues: true
  }
})

export class DynamodbTodosRepository implements ITodosRepository {
  async save(todo: Todo): Promise<any> {
    const command = new PutCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Item: todo
    });
    return await docClient.send(command);
  }
  
  async find(id: String): Promise<any> {
    const command = new GetCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id
      }
    });
    const response = await docClient.send(command);
    return response.Item
  }
  
  async list(): Promise<any> {
    const command = new ScanCommand({
      TableName: process.env.DYNAMODB_TABLE
    });
    const response = await docClient.send(command);
    return response.Items
  }

  async edit(id: String, todo: Todo): Promise<any> {
    const command = new UpdateCommand({
      TableName: process.env.DYNAMODB_TABLE,
      UpdateExpression: "set description = :description, checked = :checked",
      ExpressionAttributeValues: {
        ":description": todo.description,
        ":checked": todo.checked
      },
      Key: {
        id
      }
    });
    return await docClient.send(command);
  }

  async delete(id: String): Promise<any> {
    const command = new DeleteCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id
      }
    });

    return await docClient.send(command);
  }
}