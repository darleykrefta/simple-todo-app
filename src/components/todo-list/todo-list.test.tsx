import React from 'react'

import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import { Providers } from 'providers'
import { TodoList } from 'components/todo-list'
import { TodoCreate } from 'components/todo-create'

const Todo = () => {
  return (
    <>
      <TodoCreate />

      <TodoList />
    </>
  )
}

const setup = () => render(<Todo />, { wrapper: Providers })

describe('TodoList component', () => {
  afterEach(cleanup)

  it('should be valid with last version', () => {
    const { asFragment } = setup()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should add a new todo item correctly', () => {
    setup()
    const value = 'something'
    const inputAdd = screen.getByTestId('input-todo-add')
    const buttonAdd = screen.getByTestId('button-todo-add')
    const uncompletedLabel = screen.getByTestId('uncompleted-label')
    const completedLabel = screen.getByTestId('completed-label')
    fireEvent.change(inputAdd, { target: { value } })
    fireEvent.click(buttonAdd)
    expect(uncompletedLabel).toHaveTextContent('uncompleted 1')
    expect(completedLabel).toHaveTextContent('completed 0')
  })

  it('should remove a todo item', () => {
    setup()
    const value = 'something'
    const inputAdd = screen.getByTestId('input-todo-add')
    const buttonAdd = screen.getByTestId('button-todo-add')
    const uncompletedLabel = screen.getByTestId('uncompleted-label')
    const completedLabel = screen.getByTestId('completed-label')
    fireEvent.change(inputAdd, { target: { value } })
    fireEvent.click(buttonAdd)
    const buttonRemove = screen.getByTestId('input-todo-delete')
    fireEvent.click(buttonRemove)
    expect(uncompletedLabel).toHaveTextContent('uncompleted 0')
    expect(completedLabel).toHaveTextContent('completed 0')
  })

  it('should check as completed a todo item', () => {
    setup()
    const value = 'something'
    const inputAdd = screen.getByTestId('input-todo-add')
    const buttonAdd = screen.getByTestId('button-todo-add')
    const uncompletedLabel = screen.getByTestId('uncompleted-label')
    const completedLabel = screen.getByTestId('completed-label')
    fireEvent.change(inputAdd, { target: { value } })
    fireEvent.click(buttonAdd)
    const container = screen.getByTestId('todo-container')
    fireEvent.click(container)
    expect(uncompletedLabel).toHaveTextContent('uncompleted 0')
    expect(completedLabel).toHaveTextContent('completed 1')
  })
})
