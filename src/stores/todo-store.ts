import { atom, selector } from 'recoil'

type Todo = {
  id: number
  description: string
  completed: boolean
}

const todoItemsStore = atom<Todo[]>({
  key: 'todoList',
  default: []
})

const todoItemsQuantityStore = selector({
  key: 'todoItemsQuantityStore',
  get: ({ get }) => {
    const todoItems = get(todoItemsStore)
    const totalItems = todoItems.length
    const totalCompletedItems = todoItems.filter(item => item.completed).length
    const totalUncompletedItems = totalItems - totalCompletedItems

    return {
      totalItems,
      totalCompletedItems,
      totalUncompletedItems
    }
  }
})

export type { Todo }
export { todoItemsStore, todoItemsQuantityStore }
