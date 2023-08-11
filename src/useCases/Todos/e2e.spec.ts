import { vi, expect, test, beforeEach, describe } from 'vitest'
import createHandler from './CreateTodo/handler'
 
describe('integration tests', () => {
  beforeEach(() => {
    // do something to truncate db
  })

  test('create todo', async () => {
    const result = await createHandler({
      body: JSON.stringify({
        description: 'Awesome description'
      })
    })
    console.log(result)
  })
})