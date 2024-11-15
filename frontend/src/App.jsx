import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Box minH={"100vh"}  bgColor={useColorModeValue("gray.100", "gray.900")}>
      {/* Uses the Navbar Component that we created and puts it above the routes so that it appears on all pages. */}
      <Navbar/> 
      {/* Defines routes that determines what page will be accessed depending on the path */}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
