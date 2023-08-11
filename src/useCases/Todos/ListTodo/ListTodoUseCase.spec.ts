import { vi, expect, test, beforeEach, describe } from 'vitest'
import { ListTodoUseCase } from './ListTodoUseCase'

describe('when list todos', () => {
  let useCase, repositoryMock

  beforeEach(() => {
    repositoryMock = {
      save: vi.fn(),
      find: vi.fn(),
      list: vi.fn(() => [{ description: 'Awesome description' }]),
      edit: vi.fn(),
      delete: vi.fn()
    }
    useCase = new ListTodoUseCase(repositoryMock)
  })

  test('receives results from repository', async () => {
    const todos = await useCase.execute()
    expect(repositoryMock.list).toHaveBeenCalled()
    expect(todos).toHaveLength(1)
    expect(todos[0].description).toBe('Awesome description')
  })
})
