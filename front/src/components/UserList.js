import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useToken from './../useToken';
import Login from "./../Login";

function UserList() {
    const [users, setUsers] = useState("");
    const {token, setToken} = useToken();
    const navigate = useNavigate();
    useEffect(() => {    
      getUsers();
    }, [])
    
    const getUsers = async () => {
        const response = await axios.get("http://localhost:8099/users");
        setUsers(response.data);        
    };

    const deleteUser = async (id) => {
        try {
          await axios.delete(`http://localhost:8099/users/${id}`);
          getUsers();
        } catch (error) {
          console.log(error);
        }
    };

    const logout = async (e) => {
      e.preventDefault();
      try {
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }

    let role = localStorage.getItem('role', token.role);
    console.log("Role >>>", role);

    return (
        <div className="columns mt-5">
        {users ? (
                  <div className="column is-half">     
                  <Link to="add" className="button is-success">
                    Add New
                  </Link>
                  <table className="table is-striped is-fullwidth mt-2">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Token</th>
                        {role==='Admin' &&
                        <th>Edit</th>}
                        {role==='Admin' &&
                        <th>Delete</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.gender}</td>
                          <td>{user.username}</td>
                          <td>{user.password}</td>
                          <td>{user.role}</td>
                          <td>{user.token}</td>
                          {role==='Admin' &&
                          <td>
                            <Link
                              to={`edit/${user._id}`}
                              className="button is-info is-small mr-1"
                            >
                              Edit
                            </Link>
                          </td>}
                          {role==='Admin' &&
                          <td>
                            <button
                              onClick={() => deleteUser(user._id)}
                              className="button is-danger is-small"
                            >
                              Delete
                            </button>
                          </td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Link to="/" className="button is-danger" onClick={logout}>
                    Log Out
                  </Link>
                </div>
        ) : (
            <p>Wait for users .. </p>                 
        )}
        </div>
    )
}

export default UserList;