import { vi, expect, test, beforeEach, describe } from 'vitest'
import { FindTodoUseCase } from './FindTodoUseCase'

describe('when find todo', () => {
  let useCase, repositoryMock

  beforeEach(() => {
    repositoryMock = {
      save: vi.fn(),
      find: vi.fn(() => {
        return { description: 'Awesome description' }
      }),
      list: vi.fn(),
      edit: vi.fn(),
      delete: vi.fn()
    }
    useCase = new FindTodoUseCase(repositoryMock)
  })

  test('success with valid uuid param', async () => {
    const uuid = '57624280-37f7-11ee-be56-0242ac120002'
    const todo = await useCase.execute(uuid)
    console.error(todo)
    expect(repositoryMock.find).toHaveBeenCalledWith(uuid)
    expect(todo.description).toBe('Awesome description')
  })

  test('rejects invalid uuid param', async () => {
    const invalidUuid = 'this is an invalid uuid'
    await expect(useCase.execute(invalidUuid)).rejects.toThrowError('Must be a valid UUID v4')
    expect(repositoryMock.find).not.toHaveBeenCalled()
  })
})
