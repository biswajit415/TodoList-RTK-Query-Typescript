import { configureStore}  from '@reduxjs/toolkit';
import { todoSlice } from './features/api/todoSlice';



export const store=configureStore({
    reducer:{
        [todoSlice.reducerPath]:todoSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
    .concat(todoSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>