import React from "react";
import "./App.css";
import Header from "./components/header";
import Credentials from "./pages/credentials";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <>
      <ChakraProvider>
        <Header />
        <Credentials />
      </ChakraProvider>
    </>
  );
}

export default App;
