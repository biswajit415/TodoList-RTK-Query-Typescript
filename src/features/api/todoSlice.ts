import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Todo {
    userId:number,
    id:number,
    title:string,
    completed:boolean
}

interface TodoCreate {
    userId:number,
    title:string,
    completed:boolean
}

export  const todoSlice=createApi({
    reducerPath:'todoApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3500'}),
    tagTypes:['Todos'],

    endpoints:(builder)=>({
        fetchTodos: builder.query<Todo[],void>({
            query:()=>'/todos',
            transformResponse:(res:Todo[])=>res.sort((a,b)=>b.id-a.id),
            providesTags: ['Todos'],
        }),
        
        createTodo: builder.mutation<void,TodoCreate>({
             query:(todo)=>({
                url:'/todos',
                method:'POST',
                body:todo
             }),
             invalidatesTags:['Todos']
        }),
        updateTodo: builder.mutation({
            query:(todo)=>({
               url:`/todos/${todo.id}`,
               method:'PATCH',
               body:todo
            }),
            invalidatesTags: ['Todos'],
       }),
       deleteTodo: builder.mutation({
        query:({id})=>({
           url:`/todos/${id}`,
           method:'DELETE',
           body:id
        }),
        invalidatesTags:['Todos']
   })
    })
})


export const {
    useDeleteTodoMutation,
    useUpdateTodoMutation,
    useCreateTodoMutation,
   useFetchTodosQuery,

}=todoSlice;