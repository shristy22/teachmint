import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PeopleDirectory from './components/peopleDirectory';
import UserProfile from './components/userProfile';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
         <Route path="/" exact element={<PeopleDirectory/>} />
        <Route path="/users/:userId" element={<UserProfile/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
