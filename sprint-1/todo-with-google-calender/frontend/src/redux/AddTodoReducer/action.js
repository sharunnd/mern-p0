import axios from "axios"
import { ADD_TODO_FAILURE, ADD_TODO_REQUEST, ADD_TODO_SUCCESS} from "./actionTypes"
import Cookies from "js-cookie";


export const AddTodo =(data)=>(dispatch)=>{
    const token = Cookies.get("token");
    dispatch({type:ADD_TODO_REQUEST})
    return axios.post(`http://localhost:8080/todo/create`,data,{
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
    }).then((res)=>{
        dispatch({type:ADD_TODO_SUCCESS,payload:res.data})
        console.log(res);
        return res
    })
    .catch((err)=>{
        dispatch({type:ADD_TODO_FAILURE})
        return err
    })
}