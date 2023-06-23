import  TextField  from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=2")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
    <center>
    <h1>User List</h1>
    <TextField
      type="text"
      label="Search"
      placeholder="Search by first name"
      value={searchTerm}
      onChange={handleSearch}
    />
    {filteredUsers.map((user) => (
      <div key={user.id}>
        <p>ID: {user.id}</p>
        <img src={user.avatar} alt={user.first_name} />
        <p>First Name: {user.first_name}</p>
      </div>
    ))}
    </center>
     
    </div>
  );
};

export default App;
