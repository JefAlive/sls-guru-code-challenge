import { Todo } from "../../entities/Todo"
import { ITodosRepository } from "../ITodosRepository"
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

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
    convertClassInstanceToMap: true
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
  
  async list(): Promise<any> {
    const command = new ScanCommand({
      TableName: process.env.DYNAMODB_TABLE
    });
  
    const response = await docClient.send(command);
    return response.Items
  }
}