import { faTrash , faSpinner, faRefresh} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDeleteTodoMutation, useFetchTodosQuery, useUpdateTodoMutation } from '../api/todoSlice';
import styles from './Todo.module.css';

export interface TodoType{
  id:number;
  completed:boolean;
  title:string;
  userId:number;
}

interface propsType extends TodoType{
    updateTodo:(arg: propsType)=>void;
    deleteTodo:(arg: {'id':number})=>void;
}

export const Todo = (todo:propsType) => {
 

  const [updateTodo]=useUpdateTodoMutation();
  const [deleteTodo]=useDeleteTodoMutation();

  const [updateLoad,setUpdateLoad]=useState(false);
  const [deleteLoad,setDeleteLoad]=useState(false);
  const {isFetching,isLoading,isSuccess,}=useFetchTodosQuery();
  
  const updateData=async(data:TodoType)=>{
    setUpdateLoad(true);
    await updateTodo(data);
  }

  const deleteData=async()=>{
    setDeleteLoad(true);
    await deleteTodo({ id: todo.id })
  }

  useEffect(()=>{
    if(updateLoad &&( !isFetching)){
      setUpdateLoad(false)
    };

    if(deleteLoad &&( !isFetching)){
      setDeleteLoad(false);
    }

  },[isFetching])
  

  return (
    <React.Fragment key={todo.id}>
      {
        updateLoad?
        
        <p 
          className={styles.loading_container} 
          style={{backgroundColor: 'rgb(226, 222, 222)'}}
        > 
           <FontAwesomeIcon icon={faRefresh} className="fa-spin"style={{color:'blue' }}/>
           {' '}Updating.....
        </p>:
        deleteLoad?
        <p 
          className={styles.loading_container}
          style={{backgroundColor: 'rgb(235, 142, 142)'}}
        > 
           <FontAwesomeIcon icon={faSpinner} className="fa-spin" style={{color:'red' }}/>
           {' '}Deleteing.....
        </p>:
        <div className={styles.todo}>
          <input
            type='checkbox'
            checked={todo.completed}
            id={todo.id.toString()}
            onChange={()=>updateData({...todo,completed: !todo.completed})}
          />
          <span>{todo.title}</span>
          <button className={styles.del_btn} onClick={() => deleteData()}>
            <FontAwesomeIcon icon={faTrash}/>
          </button>
      </div>
    }

    </React.Fragment>
  )
}
