import { vi, expect, test, beforeEach, describe } from 'vitest'
import { CreateTodoUseCase } from "./CreateTodoUseCase";

describe('when saves todo', () => {
  let useCase, repositoryMock;
  
  beforeEach(() => {
    repositoryMock = {
      save: vi.fn(),
      find: vi.fn(),
      list: vi.fn(),
      edit: vi.fn(),
      delete: vi.fn()
    }
    useCase = new CreateTodoUseCase(repositoryMock);
  })

  test('success with valid uuid and description and not checked by default', async () => {
    await useCase.execute({
      description: 'A good description'
    })
    expect(repositoryMock.save).toBeCalledWith({
      description: 'A good description',
      id: expect.stringMatching(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i),
      checked: false
    })
  })

  test('description needs to be 1 or more characters long', async () => {
    await expect(useCase.execute({ description: '' })).rejects.toThrowError('1 or more')
    expect(repositoryMock.save).not.toHaveBeenCalled()
  })

  test('description needs to be 255 or fewer characters long', async () => {
    // string with 266 characters
    let description =
      "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789" +
      "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789" +
      "01234567890123456789012345678901234567890123456789012345"

    await expect(useCase.execute({ description: description })).rejects.toThrowError('255 or fewer')
    expect(repositoryMock.save).not.toHaveBeenCalled()
  })
})