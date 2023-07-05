
import React from 'react';
import {Container} from '@material-ui/core';
import { BrowserRouter as Router,Link, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

function App() {

  

  return (
    <> 
      <Router>  
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/auth" exact element={<Auth />}></Route>
        <Route path='/posts/:id' exact element={<PostDetails />}></Route>
      </Routes>
      
    </Container>
    </Router>
    </>
  );
}

export default App;
