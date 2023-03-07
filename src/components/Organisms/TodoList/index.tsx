import type { FC, FormEventHandler } from "react"
import { useEffect, useState } from "react"

import type { TodosQuery } from "@/generated/request"
import {
    Plant,
    Progress,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useTodosQuery,
    useUpdateTodoMutation,
} from "@/generated/request"

const TodoList: FC = () => {
    const INIT_TODO = {
        title: "",
        plant: Plant.Bh,
        description: "",
        repairedContent: "",
        progress: Progress.Notify,
        image1: "",
        image2: "",
    }
    const [newTodo, setNewTodo] = useState(INIT_TODO)
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

    // const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    //     e.preventDefault()
    //     const { data } = await addTodoMutation({
    //         variables: { title: todoTitle },
    //     })
    //     const addedTodo = data?.addTodo
    //     if (!addedTodo) return
    //     setTodos([addedTodo, ...todos])
    //     setTodoTitle("")
    //     await refetch()
    // }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const { data } = await addTodoMutation({
            variables: {
                title: newTodo.title,
                plant: newTodo.plant,
                description: newTodo.description,
                repairedContent: newTodo.repairedContent,
                progress: newTodo.progress,
                image1: newTodo.image1,
                image2: newTodo.image2,
            },
        })
        const addedTodo = data?.addTodo
        if (!addedTodo) return
        setTodos([addedTodo, ...todos])
        setNewTodo(INIT_TODO)
        await refetch()
    }

    // const handleChange = async (todoId: string, progress: string) => {
    //     const { data } = await updateTodoMutation({
    //         variables: { todoId, progress },
    //     })

    //     const updatedTodo = data?.updateTodo
    //     if (!updatedTodo) return

    //     const updatedTodos = todos.map((currentTodo) =>
    //         currentTodo?.id === updatedTodo.id ? updatedTodo : currentTodo
    //     )
    //     setTodos(updatedTodos)
    // }

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

    const handleChange = (e: any) => {
        const { name, value } = e.target
        console.log("name", name)
        console.log("value", value)
        setNewTodo({
            ...newTodo,
            [name]: value,
        })
    }
    console.log("newTodo", newTodo)

    return (
        <div className="p-5 border rounded">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <label htmlFor="title">Title</label>
                <input
                    className="p-2 border"
                    type="text"
                    name="title"
                    value={newTodo.title}
                    onChange={handleChange}
                />

                <label htmlFor="plant">Plant</label>
                <input
                    className="p-2 border"
                    type="text"
                    name="plant"
                    value={newTodo.plant}
                    onChange={handleChange}
                />

                <label htmlFor="description">Description</label>
                <input
                    className="p-2 border"
                    type="text"
                    name="description"
                    value={newTodo.description}
                    onChange={handleChange}
                />

                <label htmlFor="repairedContent">Repaired Content</label>
                <input
                    className="p-2 border"
                    type="text"
                    name="repairedContent"
                    value={newTodo.repairedContent}
                    onChange={handleChange}
                />

                <label htmlFor="image1">Image 1</label>
                <input
                    className="p-2 border"
                    type="text"
                    name="image1"
                    value={newTodo.image1}
                    onChange={handleChange}
                />

                <label htmlFor="image2">Image 2</label>
                <input
                    className="p-2 border"
                    type="text"
                    name="image2"
                    value={newTodo.image2}
                    onChange={handleChange}
                />

                <button className="bg-gray-200 p-2">追加</button>
            </form>
            <ul className="mt-5">
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span>
                            {todo.progress === "COMPLETED" ? "✅" : "・"}
                            {todo.title} {todo.plant}
                        </span>
                        <button onClick={() => handleDelete(todo.id)}>🗑</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList
