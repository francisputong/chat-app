import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import ReactDOM from "react-dom/client";
import App from "./App";
import ChatProvider from "./Context/ChatProvider";
import "./index.css";

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <ChatProvider>
        <BrowserRouter>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </BrowserRouter>
    </ChatProvider>
);
