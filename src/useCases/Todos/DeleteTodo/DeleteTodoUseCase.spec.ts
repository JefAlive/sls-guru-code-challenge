import { vi, expect, test, beforeEach, describe } from 'vitest'
import { DeleteTodoUseCase } from "./DeleteTodoUseCase";

describe('when deletes todo', () => {
  let useCase, repositoryMock;
  
  beforeEach(() => {
    repositoryMock = {
      save: vi.fn(),
      find: vi.fn(),
      list: vi.fn(),
      edit: vi.fn(),
      delete: vi.fn()
    }
    useCase = new DeleteTodoUseCase(repositoryMock);
  })

  test('success with valid uuid param', async () => {
    const uuid = '57624280-37f7-11ee-be56-0242ac120002'
    await useCase.execute(uuid)
    expect(repositoryMock.delete).toHaveBeenCalledWith(uuid)
  })

  test('rejects invalid uuid param', async () => {
    const invalidUuid = 'this is an invalid uuid'
    await expect(useCase.execute(invalidUuid)).rejects.toThrowError('Must be a valid UUID v4')
    expect(repositoryMock.delete).not.toHaveBeenCalled()
  })
})