import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddJob from './jobs/AddJob';
import EditJob from './jobs/EditJob';
import ViewJob from './jobs/ViewJob';
import Register from './jobs/Register';
import Login from './jobs/Login';
import React from 'react';
import ViewMap from './jobs/ViewMap';


function App() {

  

  return (
    <div className="App">
    <Router>
      <Navbar />

        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/addjob' element={<AddJob/>} />
          <Route exact path='/editjob/:id' element={<EditJob />} />
          <Route exact path='/viewJob/:id' element={<ViewJob />} />
          <Route exact path='/viewJob/:id/map' element={<ViewMap />} />
        </Routes>

    </Router>  
    

    </div>
  );
}

export default App;