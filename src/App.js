import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import { colors } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

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
        <h1 style={{ marginTop: "40px" }}>User List</h1>
        <TextField
          type="text"
          label="SEARCH"
          value={searchTerm}
          onChange={handleSearch}
        />
        <br />
        <br />
        {filteredUsers.map((user) => (
          <div
            style={{ display: "center" }}
            key={user.id}
            sx={{ color: "text.primary" }}
          >
            <div
              style={{
                marginRight: "-270px",
                marginTop: 30,
                marginLeft: 65,
                backgroundColor: "black",
                width: "22px",
                height: "24px",
                borderRadius: "20px",
                zIndex: +10,
              }}
              class="text-light bg-dark z-10 position-realtive"
            >
              {user.id}
            </div>
            <div
              className="card"
              style={{ width: "25%", borderRadius: "20px" }}
            >
              <img
                className="card"
                src={user.avatar}
                alt={user.first_name}
                style={{
                  marginLeft: "35px",
                  width: "80%",
                  marginTop: "30px",
                  borderRadius: "10px",
                }}
              />
              <div className="card-body">
                <p className="card-text-h5" style={{ marginLeft: "10px" }}>
                  {user.first_name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </center>
    </div>
  );
};

export default App;
