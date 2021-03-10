import React, { useCallback } from 'react'

import { useRecoilState } from 'recoil'

import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'

import { todoItemsStore } from 'stores/todo-store'

interface Props {
  id: string | number
  description: string
  completed: boolean
  handleDelete?: (id: string | number) => void
}

export const TodoItem: React.FC<Props> = ({ id, description, completed, handleDelete }) => {
  const [todoList, setTodoList] = useRecoilState(todoItemsStore)

  const handleCompleteItem = useCallback(() => {
    const itemIndex = todoList.findIndex(item => item.id === id)
    const todoItemUpdated = { ...todoList[itemIndex], completed: !completed }
    const todoItemsUpdated = [...todoList.slice(0, itemIndex), todoItemUpdated, ...todoList.slice(itemIndex + 1)]
    setTodoList(todoItemsUpdated)
  }, [id, completed, todoList, setTodoList])

  return (
    <Flex flex={1} justifyContent="space-between" alignItems="center">
      <Box
        p={4}
        m={1}
        w="300px"
        bg="secondary"
        border="2px"
        borderRadius="15px"
        borderColor="primary"
        cursor="pointer"
        onClick={() => handleCompleteItem()}
        data-testid="todo-container"
      >
        <Text style={{ ...(completed ? { textDecoration: 'line-through' } : {}) }} data-testid="todo-text">
          {description}
        </Text>
      </Box>

      {handleDelete ? (
        <IconButton
          bg="primary"
          color="white"
          _hover={{ bg: 'primary' }}
          borderRadius="50%"
          aria-label="delete-todo"
          onClick={() => handleDelete(id)}
          icon={<DeleteIcon />}
          data-testid="input-todo-delete"
        />
      ) : null}
    </Flex>
  )
}
