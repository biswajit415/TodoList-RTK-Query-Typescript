import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';
import { useAppSelector } from '../../hook';
import { useCreateTodoMutation, useDeleteTodoMutation, useFetchTodosQuery, useUpdateTodoMutation } from '../api/todoSlice';
import { Todo } from '../todo/Todo';
import styles from  './TodoList.module.css';
import { TodoType } from './../todo/Todo';


export const TodoList:React.FC = () => {

  const [newTodo,setTodo]=useState<string>('');
  const [updateingItem,setUpdatingItem]=useState<{id?:number;}>(
    {
      id:undefined,
    }
  )

  const {
    data:todos,
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error
  }=useFetchTodosQuery()

  const [createTodo,{ isLoading: isCreating }]=useCreateTodoMutation();
  const [updateTodo,{ isLoading: isUpdating, }]=useUpdateTodoMutation();
  const [deleteTodo,{ isLoading: isDeleting}]=useDeleteTodoMutation();

  const data=useAppSelector(state=>state.todoApi);
  // console.log(data)

  //console.log(isFetching,isUpdating)
 
  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    createTodo({userId:1,title:newTodo,completed:false});
    setTodo('');
  }

  const updateTodoItem=(todo:TodoType)=>{
    const {id}=todo;
    setUpdatingItem({id});
    updateTodo(todo)
  }

 

  const onChangeHandler:React.ChangeEventHandler<HTMLInputElement>=(e)=>{
    setTodo(e.target.value);
  }



  return (
    <div style={{width:'100%'}}>
      <h1 style={{textAlign:'center'}}>Todo List</h1>
      <form onSubmit={handleSubmit} className={styles.submit}>
          
          <input
            type='text'
            id='new-todo'
            value={newTodo}
            onChange={onChangeHandler}
            placeholder='Enter New Todo'
          />
            <button >
                <FontAwesomeIcon icon={faUpload}/>
            </button>
   
      </form>

      {
        isCreating?
        <p>Creating new todo in the list ......</p>:null
      }

      {
        isLoading?
        <p>Loading......</p>:
        isSuccess?
        <div className={styles.todo_list}>
          {
            todos.map(item=>{
              return <Todo 
                key={item.id}
                updateTodo={updateTodoItem}
                deleteTodo={deleteTodo}
                {...item}
              />
            })

          }
        </div>
        :
        isError?
        <p>
          {
            ('data' in error) ?JSON.stringify(error.data)
            :'error occured'
          }
        </p>:null
      }
    </div>
   
  )
}
