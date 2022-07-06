import React from "react";
import { Route } from "react-router-dom";
import Home from "./routes/Home";
import Chat from "./routes/Chat";
import "./App.css";

function App() {
    return (
        <div className='app'>
            <Route path='/' component={Home} exact />
            <Route path='/chats' component={Chat} exact />
        </div>
    );
}

export default App;
