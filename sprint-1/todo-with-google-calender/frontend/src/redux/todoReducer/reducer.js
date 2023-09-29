import { ADD_TODO_SUCCESS } from "../AddTodoReducer/actionTypes"
import { ADD_TODO_FAILURE, ADD_TODO_REQUEST, GET_TODO_FAILURE, GET_TODO_REQUEST, GET_TODO_SUCCESS } from "./actionTypes"

const initialState = {
    isLoading:false,
    isError:false,
    todos:[],
    
}


export const reducer = (state=initialState,{type,payload})=>{
    switch(type){
        case GET_TODO_REQUEST:{
            return {
                ...state,isLoading:true
            }
        }
        case GET_TODO_FAILURE:{
            return {
                ...state,isLoading:false,isError:true
            }
        }
        
        case GET_TODO_SUCCESS:{
            return {
                ...state,isLoading:false,todos:payload
            }
        }
        
        default:{
            return state
        }
    }
}