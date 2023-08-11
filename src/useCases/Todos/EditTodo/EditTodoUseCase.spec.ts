import { vi, expect, test, beforeEach, describe } from 'vitest'
import { EditTodoUseCase } from './EditTodoUseCase'
import { Todo } from '../../../entities/Todo'

describe('when updates todo', () => {
  let useCase, repositoryMock

  beforeEach(() => {
    repositoryMock = {
      save: vi.fn(),
      find: vi.fn(),
      list: vi.fn(),
      edit: vi.fn(),
      delete: vi.fn()
    }
    useCase = new EditTodoUseCase(repositoryMock)
  })

  test('success with valid uuid, description and checked attributes', async () => {
    const uuid = '57624280-37f7-11ee-be56-0242ac120002'
    const updateAttributes = {
      description: 'A good description',
      checked: true
    }
    await useCase.execute(uuid, updateAttributes)
    expect(repositoryMock.edit).toBeCalledWith(uuid, new Todo(updateAttributes, uuid))
  })

  test('rejects invalid uuid param', async () => {
    const invalidUuid = 'this is an invalid uuid'
    const updateAttributes = {
      description: 'A good description',
      checked: true
    }
    await expect(useCase.execute(invalidUuid, updateAttributes)).rejects.toThrowError('Must be a valid UUID v4')
    expect(repositoryMock.edit).not.toHaveBeenCalled()
  })

  test('rejects invalid checked attribute', async () => {
    const uuid = '57624280-37f7-11ee-be56-0242ac120002'
    const updateAttributes = {
      description: 'A good description'
    }
    await expect(useCase.execute(uuid, updateAttributes)).rejects.toThrowError('invalid_type')
    expect(repositoryMock.edit).not.toHaveBeenCalled()
  })

  test('description needs to be 1 or more characters long', async () => {
    const uuid = '57624280-37f7-11ee-be56-0242ac120002'
    const updateAttributes = {
      description: '',
      checked: true
    }
    await expect(useCase.execute(uuid, updateAttributes)).rejects.toThrowError('1 or more')
    expect(repositoryMock.edit).not.toHaveBeenCalled()
  })

  test('description needs to be 255 or fewer characters long', async () => {
    const uuid = '57624280-37f7-11ee-be56-0242ac120002'
    // string with 266 characters
    const description =
      '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789' +
      '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789' +
      '01234567890123456789012345678901234567890123456789012345'
    const updateAttributes = {
      description,
      checked: true
    }
    await expect(useCase.execute(uuid, updateAttributes)).rejects.toThrowError('255 or fewer')
    expect(repositoryMock.save).not.toHaveBeenCalled()
  })
})
