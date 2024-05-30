import React from "react";
import "./App.css";
import Credentials from "./pages/credentials";
import { ChakraProvider } from "@chakra-ui/react";
import Headers from "./components/login/header";
import Overview from "./pages/overview";

function App() {
  return (
    <>
      <ChakraProvider>
        <Overview />
      </ChakraProvider>
    </>
  );
}

export default App;
