import React from 'react'

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { Providers } from 'providers'
import { TodoItem } from './todo-item'

interface Props {
  id: string | number
  description: string
  completed: boolean
  handleDelete?: (id: string | number) => void
}

const initialValuesMock: Props = { id: 'item', description: 'todo 1', completed: false }

const setup = (props: Props) => render(<TodoItem {...props} />, { wrapper: Providers })

describe('TodoList component', () => {
  afterEach(cleanup)

  it('should be valid with last version', () => {
    const { asFragment } = setup(initialValuesMock)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with initialValues correctly', () => {
    setup(initialValuesMock)
    const text = screen.getByTestId('todo-text')
    expect(text).toHaveTextContent(initialValuesMock.description)
  })

  it('should call correctly when handleDelete is passed', () => {
    const handleDelete = jest.fn()
    const initialValue: Props = { ...initialValuesMock, handleDelete }
    setup(initialValue)
    const buttonRemove = screen.getByTestId('input-todo-delete')
    fireEvent.click(buttonRemove)
    expect(handleDelete).toBeCalled()
  })

  it('should complete an item correctly when handleCompleteItem is called', () => {
    setup(initialValuesMock)
    const container = screen.getByTestId('todo-container')
    const text = screen.getByTestId('todo-text')
    fireEvent.click(container)
    waitFor(() => expect(text).toHaveStyle('text-decoration: line-through'))
  })
})
