import {
    Box,
    Button,
   
    FormControl,
    
    HStack,
    Heading,
    
    Input,
    Text,
    VStack,
    useToast,
  } from "@chakra-ui/react";
//   import axios from "axios";
  import React, { useState } from "react";
  import { useDispatch } from "react-redux";
  import { NavLink, useNavigate } from "react-router-dom";
  
  
  export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
  
    const handleLogin = () => {
      const loginData = {
        email,
        password,
      };
      dispatch({ type: LOGIN_REQUEST });
      axios
        .post(`https://buycars-gksq.onrender.com/users/login`, loginData)
        .then((res) => {
          dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
          toast({
            position: "top",
            title: `${res.data.msg}`,
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          console.log(res);
          // Store token in cookies
          Cookies.set("token", res.data.token);
  
          setTimeout(() => {
            navigate("/buycar");
          }, 500);
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
      <Box
        bg="#f9efef"
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          w={{ base: "300px", md: "400px", lg: "600px" }}
          m="auto"
          p={50}
          rounded={10}
          bg="white"
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        >
          <Heading fontWeight={500}>Login</Heading>
          <VStack
            m="auto"
            p={{ base: "10px", md: "20px", lg: "50px" }}
            spacing={5}
          >
            <FormControl isRequired>
              <Input
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <Input
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </VStack>
          <Button
            bg="#673ab7"
            color="white"
            // onClick={handleLogin}
            _hover={{ bg: "#620cf6" }}
          >
            Login
          </Button>
          <HStack mt={5} alignItems="center" justifyContent="center">
            <Text>Need an account?</Text>
            <NavLink to="/signup">
              <Text color="#5e03f1">Signup</Text>
            </NavLink>
          </HStack>
        </Box>
      </Box>
    );
  };
  