import { Todo } from '../../entities/Todo'
import { ITodosRepository } from '../ITodosRepository'
import { PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'

import docClient from './DynamodbClient'

export class DynamodbTodosRepository implements ITodosRepository {
  async save (todo: Todo): Promise<any> {
    const command = new PutCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Item: todo
    })
    return await docClient.send(command)
  }

  async find (id: string): Promise<any> {
    const command = new GetCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id
      }
    })
    const response = await docClient.send(command)
    return response.Item
  }

  async list (): Promise<any> {
    const command = new ScanCommand({
      TableName: process.env.DYNAMODB_TABLE
    })
    const response = await docClient.send(command)
    return response.Items
  }

  async edit (id: string, todo: Todo): Promise<any> {
    const command = new UpdateCommand({
      TableName: process.env.DYNAMODB_TABLE,
      UpdateExpression: 'set description = :description, checked = :checked',
      ExpressionAttributeValues: {
        ':description': todo.description,
        ':checked': todo.checked
      },
      Key: {
        id
      }
    })
    return await docClient.send(command)
  }

  async delete (id: string): Promise<any> {
    const command = new DeleteCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id
      }
    })

    return await docClient.send(command)
  }
}
