import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { BsMoon } from "react-icons/bs";
import { getAllTodos } from "../redux/todoReducer/action";
import { AddTodo } from "../redux/AddTodoReducer/action";
import axios from "axios";
import Cookies from "js-cookie";

export const Home = () => {
    const [title,setTitle] = useState("")
  const dispatch = useDispatch();
  const toast = useToast();
  const todos = useSelector((store) => store.todoReducer.todos);
  const addedTodo = useSelector((store) => store.addTodoReducer.todo);
  const token = Cookies.get("token");
  useEffect(() => {
    dispatch(getAllTodos)
  }, [addedTodo]);

  const handleAdd = ()=>{
    const obj = {
        title
    }
    
    dispatch(AddTodo(obj))
      .then((res) => {
        setTitle("")
        toast({
          position: "top",
          title: `${res.data.msg}`,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          position: "top",
          title: `Try another image`,
          status: "error",
          duration: 1500,
          isClosable: true,
        });
        console.log(err);
      });
      setTitle("")
  }

  const handleEdit = (id, statusValue) => {
    const obj = {
      status: statusValue ? false : true
    };
    console.log(obj,id)
    axios
      .patch(`http://localhost:8080/todo/update/${id}`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast({
          position: "top",
          title: `${res.data.msg}`,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        console.log(res);
      })
      .catch((err) => {
        toast({
          position: "top",
          title: `${err.response.data.msg}`,
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        console.log(err);
      });
  };
  return <Box width={"50%"} m={"auto"} mt={50}>
       <Box mb={50}>
         <Flex >
         <Input type="text" placeholder="Add Todo" onChange={(e)=>setTitle(e.target.value)}/> 
         <Button onClick={handleAdd}>Add</Button>
         </Flex>
       </Box>
    {
            todos && todos.map((item)=>(
                <Flex mb={2}>
                <Input type="text" value={item.title} />
                <Button onClick={()=>handleEdit(item._id,item.status)}>{item.status ? "Completed" : "Pending"}</Button>
                <IconButton  icon={<BiEdit />} />
                <IconButton icon={<RxCross1 />} />
                </Flex>
            ))
         }
  </Box>;
};
