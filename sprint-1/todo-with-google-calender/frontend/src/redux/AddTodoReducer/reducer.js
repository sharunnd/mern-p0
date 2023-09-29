import { ADD_TODO_FAILURE, ADD_TODO_REQUEST, ADD_TODO_SUCCESS} from "./actionTypes"

const initialState = {
    isLoading:false,
    isError:false,
    todo:[],
}


export const reducer = (state=initialState,{type,payload})=>{
    switch(type){
        case ADD_TODO_REQUEST:{
            return {
                ...state,isLoading:true
            }
        }
        case ADD_TODO_FAILURE:{
            return {
                ...state,isLoading:false,isError:true
            }
        }
        
        case ADD_TODO_SUCCESS:{
            return {
                ...state,isLoading:false,todo:payload
            }
        }
        default:{
            return state
        }
    }
}