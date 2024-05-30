import React, { useState } from "react";
import "./App.css";
import Credentials from "./pages/credentials";
import { ChakraProvider } from "@chakra-ui/react";
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
