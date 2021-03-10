import React from 'react'

import { cleanup, fireEvent, render, screen } from '@testing-library/react'

import { Providers } from 'providers'
import { TodoCreate } from 'components/todo-create'

const setup = () => render(<TodoCreate />, { wrapper: Providers })

describe('TodoCreate component', () => {
  afterEach(cleanup)

  it('should be valid with last version', () => {
    const { asFragment } = setup()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should be initiate with zero completed values', () => {
    setup()
    const completedLabel = screen.getByTestId('completed-label')
    expect(completedLabel).toHaveTextContent('completed 0')
  })

  it('should be initiate with zero uncompleted values', () => {
    setup()
    const uncompletedLabel = screen.getByTestId('uncompleted-label')
    expect(uncompletedLabel).toHaveTextContent('uncompleted 0')
  })

  it('should validate add event within value', () => {
    setup()
    const buttonAdd = screen.getByTestId('button-todo-add')
    fireEvent.click(buttonAdd)
    const uncompletedLabel = screen.getByTestId('uncompleted-label')
    expect(uncompletedLabel).toHaveTextContent('uncompleted 0')
  })

  it('should validate input change', () => {
    setup()
    const value = 'something'
    const inputAdd = screen.getByTestId('input-todo-add')
    const buttonAdd = screen.getByTestId('button-todo-add')
    const uncompletedLabel = screen.getByTestId('uncompleted-label')
    fireEvent.change(inputAdd, { target: { value } })
    fireEvent.click(buttonAdd)
    expect(uncompletedLabel).toHaveTextContent('uncompleted 1')
  })
})
