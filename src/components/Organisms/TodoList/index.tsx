import type { FC, FormEventHandler } from "react"
import { useEffect, useState } from "react"

import type { TodosQuery } from "@/generated/request"
import {
    useAddTodoMutation,
    useDeleteTodoMutation,
    useTodosQuery,
    useUpdateTodoMutation,
} from "@/generated/request"

const TodoList: FC = () => {
    const [todoTitle, setTodoTitle] = useState("")
    const [todos, setTodos] = useState<TodosQuery["todos"]>([])
    const { loading, error, data, refetch } = useTodosQuery()
    const [addTodoMutation, addTodoMutationResult] = useAddTodoMutation()
    const [updateTodoMutation] = useUpdateTodoMutation()
    const [deleteTodoMutation] = useDeleteTodoMutation()

    useEffect(() => {
        setTodos(data?.todos ?? [])
    }, [data?.todos])

    if (loading) return <h1>loading...</h1>
    if (error) return <h1>error!</h1>
    if (!data?.todos) return null

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const { data } = await addTodoMutation({
            variables: { title: todoTitle },
        })
        const addedTodo = data?.addTodo
        if (!addedTodo) return
        setTodos([addedTodo, ...todos])
        setTodoTitle("")
        await refetch()
    }

    const handleChange = async (todoId: string, progress: string) => {
        const { data } = await updateTodoMutation({
            variables: { todoId, progress },
        })

        const updatedTodo = data?.updateTodo
        if (!updatedTodo) return

        const updatedTodos = todos.map((currentTodo) =>
            currentTodo?.id === updatedTodo.id ? updatedTodo : currentTodo
        )
        setTodos(updatedTodos)
    }

    const handleDelete = async (todoId: string) => {
        const isOk = confirm("削除しますか？")
        if (isOk === false) return
        const { data } = await deleteTodoMutation({ variables: { todoId } })
        const deletedTodo = data?.deleteTodo
        if (!deletedTodo) return

        const deletedTodos = todos.filter(
            (currentTodo) => currentTodo?.id !== deletedTodo.id
        )
        setTodos(deletedTodos)
    }

    return (
        <div className="p-5 border rounded">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    className="p-2 border"
                    type="text"
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                />
                <button className="bg-gray-200 p-2">追加</button>
            </form>
            <ul className="mt-5">
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span>
                            {todo.progress === "完了" ? "✅" : "・"}
                            {todo.title}{" "}
                        </span>
                        <button onClick={() => handleDelete(todo.id)}>🗑</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList
