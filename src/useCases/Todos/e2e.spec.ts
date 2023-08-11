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

  test('rejects creation of todo with invalid description sizes', async () => {
    // Creates Todo with short description
    let response = await createHandler({
      body: JSON.stringify({
        description: ''
      })
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatch(/Must be 1 or more characters long/)

    // Creates Todo with long description
    const longDescription =
      '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789' +
      '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789' +
      '01234567890123456789012345678901234567890123456789012345'
    response = await createHandler({
      body: JSON.stringify({
        description: longDescription
      })
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatch(/Must be 255 or fewer characters long/)

    // So there is no Todos available
    response = await listHandler()
    const data = JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(data).toHaveLength(0)
  })

  test('rejects editing of todo with invalid attributes', async () => {
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

    // Edits as checked
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

    // Tries editing invalid short description
    response = await editHandler({
      pathParameters: {
        id: uuid
      },
      body: JSON.stringify({
        description: ''
      })
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatch(/Must be 1 or more characters long/)

    // Tries editing invalid long description
    const longDescription =
      '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789' +
      '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789' +
      '01234567890123456789012345678901234567890123456789012345'
    response = await editHandler({
      pathParameters: {
        id: uuid
      },
      body: JSON.stringify({
        description: longDescription,
        checked: false
      })
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatch(/Must be 255 or fewer characters long/)

    // Tries editing invalid checked attribute
    response = await editHandler({
      pathParameters: {
        id: uuid
      },
      body: JSON.stringify({
        description: 'Some valid description'
      })
    })
    expect(response.statusCode).toBe(400)
    expect(response.body).toMatch(/invalid_type.*Required/)

    // Finds Todo for asserting
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

    // List the only Todo available
    response = await listHandler()
    data = JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(data).toHaveLength(1)
  })

  test('creates normally when editing without existing id', async () => {
    const uuid = '8b98a22c-3894-11ee-be56-0242ac120002'

    let response = await editHandler({
      pathParameters: {
        id: uuid
      },
      body: JSON.stringify({
        description: 'Some valid description',
        checked: true
      })
    })
    expect(response.statusCode).toBe(200)

    // List the only Todo available
    response = await listHandler()
    const data = JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(data).toHaveLength(1)
  })

  test('do nothing when try to delete inexistent todo', async () => {
    const uuid = '8b98a22c-3894-11ee-be56-0242ac120002'

    const response = await deleteHandler({
      pathParameters: {
        id: uuid
      }
    })
    expect(response.statusCode).toBe(200)
  })

  test('not found when tries to find inexistent todo', async () => {
    const uuid = '8b98a22c-3894-11ee-be56-0242ac120002'

    const response = await findHandler({
      pathParameters: {
        id: uuid
      }
    })
    console.log(response)
    expect(response.statusCode).toBe(404)
  })
})