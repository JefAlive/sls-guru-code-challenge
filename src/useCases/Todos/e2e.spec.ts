import { beforeEach, expect, test, describe } from 'vitest'
import docClient from '../../repositories/implementations/DynamodbClient'
import { CreateTableCommand, DeleteTableCommand } from '@aws-sdk/client-dynamodb'
import createHandler from './CreateTodo/handler'

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

  test('create todo', async () => {
    const response = await createHandler({
      body: JSON.stringify({
        description: 'Awesome description'
      })
    })
    const data = JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(data.message).toBe('Created Todo.')
  })
})
