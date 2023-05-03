import React, { useState } from 'react'

type FormElement = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: string
  complete: boolean
}

function App(): JSX.Element {
  const [value, setValue] = useState<string>("")
  const [todos, setTodos] = useState<ITodo[]>([])

  const handleSubmit = (event: FormElement): void => {
    event.preventDefault()
    addTodo(value)
    setValue('')
  }

  const addTodo = (text: string): void => {
    setTodos([...todos, { text, complete: false }])
  }
  console.log(todos)

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]

    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  const deleteTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={event => setValue(event.target.value)}
          required
        />
        <button type='submit'>Add Todo</button>
      </form>
      <div>
        {todos.map((todo: ITodo, index: number) => {
          return (
            <div key={index}>
              <div
                style={{ textDecoration: todo.complete ? 'line-through' : '' }}
              >
                {todo.text}
              </div>
              <button type='button' onClick={(): void => completeTodo(index)}>
                {todo.complete ? 'Incomplete' : 'Complete'}
              </button>
              <button type='button' onClick={(): void => deleteTodo(index)}>
                X
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default App


