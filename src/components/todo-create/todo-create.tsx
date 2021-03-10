import React, { useCallback } from 'react'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { Badge, Button, Flex, Input, Text } from '@chakra-ui/react'

import { generateId } from 'helpers/functions'
import { todoItemsQuantityStore, todoItemsStore } from 'stores/todo-store'

export const TodoCreate: React.FC = () => {
  const [value, setValue] = React.useState<string>('')

  const setTodoItems = useSetRecoilState(todoItemsStore)
  const { totalCompletedItems, totalUncompletedItems } = useRecoilValue(todoItemsQuantityStore)

  const handleAddItem = useCallback(() => {
    if (!value) {
      return
    }

    setTodoItems(oldTodoItems => [
      ...oldTodoItems,
      {
        id: generateId(),
        description: value,
        completed: false
      }
    ]),
      setValue('')
  }, [value, setTodoItems])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

  return (
    <Flex flexDir="column" alignItems="center">
      <Text color="primary" fontSize="36px" py={5}>
        TODO
      </Text>

      <Flex w="320px" justifyContent="space-around" my={5}>
        <Badge fontSize="sm" background="primary" color="white">
          <Text textDecoration="line-through" data-testid="completed-label">
            completed {totalCompletedItems}
          </Text>
        </Badge>

        <Badge fontSize="sm" background="primary" color="white" data-testid="uncompleted-label">
          uncompleted {totalUncompletedItems}
        </Badge>
      </Flex>

      <Flex w="320px" justifyContent="space-around">
        <Input
          w="220px"
          borderColor="primary"
          background="white"
          size="lg"
          value={value}
          onChange={handleChange}
          data-testid="input-todo-add"
        />

        <Button
          background="primary"
          color="white"
          variant="solid"
          size="lg"
          onClick={() => handleAddItem()}
          data-testid="button-todo-add"
        >
          ADD
        </Button>
      </Flex>
    </Flex>
  )
}
