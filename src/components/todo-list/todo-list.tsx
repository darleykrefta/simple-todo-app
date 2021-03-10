import React, { useCallback } from 'react'

import { useRecoilState } from 'recoil'

import { Flex } from '@chakra-ui/react'

import { TodoItem } from 'components/todo-item'
import { todoItemsStore } from 'stores/todo-store'

export const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useRecoilState(todoItemsStore)

  const handleDelete = useCallback(
    (id: string | number) => {
      const todoListUpdated = todoList.filter(item => item.id !== id)

      setTodoList(todoListUpdated)
    },
    [todoList, setTodoList]
  )

  return (
    <Flex flexDir="column" alignItems="center" mt={5} maxH="50vh" overflow="auto" data-testid="todo-list">
      {todoList.map(({ id, description, completed }) => (
        <TodoItem key={id} id={id} description={description} completed={completed} handleDelete={handleDelete} />
      ))}
    </Flex>
  )
}
