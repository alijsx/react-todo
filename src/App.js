// App.js

import React from 'react';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Routes } from 'react-router-dom';

import TasksPage from './Pages/Tasks';

import Home from './Pages/Home';
import './App.css'
const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TasksPage />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
