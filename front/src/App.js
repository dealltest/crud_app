import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Login from "./Login";
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();
  console.log("App.js Token : " + JSON.stringify(token));
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="app">
        <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="add" element={<AddUser />} />
            <Route path="edit/:id" element={<EditUser />} />
          </Routes>
        </div>
        </BrowserRouter>
      </div>
  );
}

export default App;