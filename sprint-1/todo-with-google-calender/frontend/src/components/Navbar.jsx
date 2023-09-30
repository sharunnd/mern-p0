import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    useToast,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useMediaQuery,
  } from "@chakra-ui/react";
  import Cookies from "js-cookie";
  import { Link, useNavigate } from "react-router-dom";

  import { HamburgerIcon } from "@chakra-ui/icons";
  
  export const Navbar = () => {
    
    const token = Cookies.get("token");
    
    const toast = useToast();
    
    const userRole = Cookies.get("role");
    const navigate = useNavigate();
   
  
    const handleLogout = () => {
      Cookies.remove("role");
      toast({
        position: "top",
        title: `Logged out!`,
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      navigate("/");
      Cookies.remove("token");
     
    };
  
    const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  
    return (
      <Box
        bg="#dbdbf5"
        boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
        w="100%"
        position="sticky"
        top={0}
        zIndex="10"
      >
        <Flex
          alignItems="center"
          justifyContent={{
            base: "space-between",
            md: "space-between",
            lg: "space-around",
          }}
          
        >
          <Heading ml={{ base: "10px", md: "24px", lg: "40px" }} fontSize={{ base: "20px",sm:"25px",md:"30px",lg:"35px"}}>Todo</Heading>
  
          

  
          {!isSmallerScreen ? (
            <Flex
              // w="auto"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box mr={5}>
              <Link to={"/"}>Home</Link>
  
              </Box>
              
              
                <Flex>
                  <Button p="10px" mt="10px" mb="10px" mr={5}>
                    <Link to={"/login"}>Login</Link>
                  </Button>
                  <Button p="10px" mt="10px" mb="10px">
                    <Link to={"/signup"}>Signup</Link>
                  </Button>
                </Flex>
            
            </Flex>
          ) : (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <MenuItem as={Link} to={"/"}>
                  Home
                </MenuItem>
                <MenuItem as={Link} to={"/oemspecs"}>
                  OEM Specs
                </MenuItem>
                <MenuItem as={Link} to={"/buycar"}>
                  Buy
                </MenuItem>
                {userRole === "dealer" && (
                  <MenuItem as={Link} to={"/sellcar"}>
                    Sell
                  </MenuItem>
                )}
                {!token ? (
                  <>
                    <MenuItem as={Link} to={"/login"}>
                      Login
                    </MenuItem>
                    <MenuItem as={Link} to={"/signup"}>
                      Signup
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                )}
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Box>
    );
  };
  