import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { useState,useEffect } from 'react';
import { ProtectedRoute } from './components/ProtectedRoute';
import { auth } from "./components/firebase";

import { onAuthStateChanged } from "firebase/auth";
import Navbar from './components/Navbar';
import ComplaintForm from './components/ComplaintForm';
import LeavingForm from './components/LeavingForm';
import StudentDetails from './components/StudentDetails';

const App = () => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }

      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }
    return (
      <Router>
        <Navbar />
            <Routes>
          <Route path="/" element={<Login user={user} />}></Route>
          <Route path="/student-details" element={<ProtectedRoute user={user}><StudentDetails/></ProtectedRoute>}></Route>
        <Route exact path="/ComplaintForm" element={<ProtectedRoute user={user}><ComplaintForm/></ProtectedRoute>}></Route>
        <Route exact path="/LeavingForm" element={<ProtectedRoute user={user}><LeavingForm/></ProtectedRoute>}></Route>
        {/* <Route exact path="/student/:id" element={<ProtectedRoute user={user}><StudentDetails/></ProtectedRoute>}></Route> */}
            </Routes>
        </Router>
    );
};

export default App;
