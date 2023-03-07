import type { Resolvers } from "@/generated/resolvers-types"

export const resolvers: Resolvers = {
    Query: {
        todos: async (_, __, { prisma, currentUser }) => {
            if (!currentUser) {
                throw new Error("User not logged in.")
            }
            const todos = await prisma.todo.findMany({
                orderBy: { createdAt: "desc" },
                include: { user: true },
                where: { userId: currentUser.id },
            })
            return todos
        },
    },
    Mutation: {
        addTodo: async (
            _,
            {
                title,
                plant,
                description,
                repairedContent,
                progress,
                image1,
                image2,
            },
            { prisma, currentUser }
        ) => {
            if (!currentUser) {
                throw new Error("User not logged in.")
            }
            const todo = await prisma.todo.create({
                data: {
                    userId: currentUser.id,
                    title,
                    plant,
                    description,
                    ...(repairedContent && { repairedContent }),
                    progress,
                    ...(image1 && { image1 }),
                    ...(image2 && { image2 }),
                },
                include: { user: true },
            })
            return todo
        },
        updateTodo: async (
            _,
            {
                todoId,
                title,
                plant,
                description,
                repairedContent,
                progress,
                image1,
                image2,
            },
            { prisma, currentUser }
        ) => {
            if (!currentUser) {
                throw new Error("User not logged in.")
            }
            const todo = await prisma.todo.update({
                where: { id: todoId },
                data: {
                    ...(title && { title }),
                    ...(plant && { plant }),
                    ...(description && { description }),
                    ...(repairedContent && { repairedContent }),
                    ...(progress && { progress }),
                    ...(image1 && { image1 }),
                    ...(image2 && { image2 }),
                },
                include: { user: true },
            })
            return todo
        },
        deleteTodo: async (_, { todoId }, { prisma, currentUser }) => {
            if (!currentUser) {
                throw new Error("User not logged in.")
            }
            const todo = await prisma.todo.delete({
                where: { id: todoId },
                include: { user: true },
            })
            return todo
        },
    },
}
