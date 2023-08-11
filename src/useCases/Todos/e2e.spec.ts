import { beforeEach, expect, test, describe } from 'vitest'
import { CreateTableCommand, DeleteTableCommand } from '@aws-sdk/client-dynamodb'
import docClient from '../../repositories/implementations/DynamodbClient'

import createHandler from './CreateTodo/handler'
import editHandler from './EditTodo/handler'
import findHandler from './FindTodo/handler'
import listHandler from './ListTodo/handler'
import deleteHandler from './DeleteTodo/handler'

async function resetDatabase() {
  const deleteTableCommand = new DeleteTableCommand({
    TableName: process.env.DYNAMODB_TABLE
  })
  const createTableCommand = new CreateTableCommand({
    TableName: process.env.DYNAMODB_TABLE,
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  })
  await docClient.send(deleteTableCommand)
  await docClient.send(createTableCommand)
}

describe('integration tests', () => {
  beforeEach(() => resetDatabase)

  test('creates, edit, find, deletes and lists todos successfully', async () => {
    // Creates Todo
    let response = await createHandler({
      body: JSON.stringify({
        description: 'Awesome description'
      })
    })
    let data = JSON.parse(response.body)
    const uuid = data.id
    expect(response.statusCode).toBe(200)
    expect(data.message).toBe('Created Todo.')
    expect(data.id).toBeTypeOf('string')

    // Edits Todo as checked and other description
    response = await editHandler({
      pathParameters: {
        id: uuid
      },
      body: JSON.stringify({
        checked: true,
        description: 'Another awesome description'
      })
    })
    data = JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(data.message).toBe('Edited Todo.')
    
    // Finds Todo
    response = await findHandler({
      pathParameters: {
        id: uuid
      }
    })
    data = JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(data.id).toBe(uuid)
    expect(data.description).toBe('Another awesome description')
    expect(data.checked).toBeTruthy()

    // List Todos
    response = await listHandler()
    data = JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(data).toHaveLength(1)
    
    // Delete Todo
    response = await deleteHandler({
      pathParameters: {
        id: uuid
      }
    })
    expect(response.statusCode).toBe(200)

    // So there is no more Todos available
    response = await listHandler()
    data = JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(data).toHaveLength(0)
  })
})