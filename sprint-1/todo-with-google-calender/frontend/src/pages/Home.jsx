import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { getAllTodos } from "../redux/todoReducer/action";
import { AddTodo } from "../redux/AddTodoReducer/action";
import axios from "axios";
import Cookies from "js-cookie";

export const Home = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const todos = useSelector((store) => store.todoReducer.todos);
  const addedTodo = useSelector((store) => store.addTodoReducer.todo);
  const token = Cookies.get("token");

  useEffect(() => {
    dispatch(getAllTodos);
  }, [addedTodo, dispatch]);

  const handleAdd = () => {
    const obj = {
      title,
    };

    dispatch(AddTodo(obj))
      .then((res) => {
        toast({
          position: "top",
          title: `${res.data.msg}`,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        setTitle("");
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

    setTitle(""); // Resetting title state
  };

  const handleEdit = (id, statusValue) => {
    const obj = {
      status: statusValue ? false : true,
    };

    axios
      .patch(
        `https://todo-with-google-calender.onrender.com/todo/update/${id}`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast({
          position: "top",
          title: `${res.data.msg}`,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        dispatch(getAllTodos);
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
  const handleDelete = (id) => {
    axios
      .delete(
        `https://todo-with-google-calender.onrender.com/todo/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast({
          position: "top",
          title: `${res.data.msg}`,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        dispatch(getAllTodos);
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
  return (
    <Box width={"50%"} m={"auto"} mt={50}>
      <Box mb={50}>
        <Flex>
          <Input
            type="text"
            placeholder="Add Todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button onClick={handleAdd}>Add</Button>
        </Flex>
      </Box>
      {todos &&
        todos.map((item) => (
          <Flex mb={2} key={item._id}>
            <Input type="text" defaultValue={item.title} />
            <Button onClick={() => handleEdit(item._id, item.status)} mx={5}>
              {item.status ? "Completed" : "Pending"}
            </Button>
            <IconButton
              icon={<RxCross1 />}
              onClick={() => handleDelete(item._id)}
            />
          </Flex>
        ))}
    </Box>
  );
};
