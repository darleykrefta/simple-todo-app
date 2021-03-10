import { generateId } from './functions'

describe('Functions', () => {
  it('Function generateId should increment id variable', () => {
    expect(generateId()).toBe(0)
    expect(generateId()).toBe(1)
    expect(generateId()).toBe(2)
  })
})
