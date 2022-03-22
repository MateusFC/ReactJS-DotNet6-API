import React, { Component } from "react";
import {BrowserRouter, Route ,Routes} from 'react-router-dom';

import Login from "./pages/Login";
import Book from "./pages/Book";
import NewBook from "./pages/NewBook";
import Header from "./Components/Header";


import { ToastContainer } from 'react-toastify';

class Rotas extends Component {
    render(){
       
        return(
            <BrowserRouter> 
            <Header/>
            <ToastContainer/>
            <Routes>
                <Route path="/" exact element={<Login/>} />
                <Route path="/book" element={<Book/>} />
                <Route path="/books/new/:bookId" element={<NewBook/>} />
            </Routes>
        </BrowserRouter>
        );
    };
}
export default Rotas;
