import React from 'react'

import { Box, Flex } from '@chakra-ui/react'

import { TodoList } from 'components/todo-list'
import { TodoCreate } from 'components/todo-create'

export const App: React.FC = () => (
  <Box w="100vw" h="100vh" bg="background">
    <Flex flexDir="column" justifyContent="center" py={10}>
      <TodoCreate />

      <TodoList />
    </Flex>
  </Box>
)
