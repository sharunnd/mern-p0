import axios from "axios"
import { GET_TODO_FAILURE, GET_TODO_REQUEST, GET_TODO_SUCCESS} from "./actionTypes"
import Cookies from "js-cookie";


export const getAllTodos =(dispatch)=>{
    const token = Cookies.get("token");
    dispatch({type:GET_TODO_REQUEST})
    axios.get(`http://localhost:8080/todo`,{
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
    }).then((res)=>{
        dispatch({type:GET_TODO_SUCCESS,payload:res.data})
        console.log(res);
    })
    .catch((err)=>{
        dispatch({type:GET_TODO_FAILURE})
    })
}