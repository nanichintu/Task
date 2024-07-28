import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");
  const [initialCity, setInitialCity] = useState("");
  const [initialTemperature, setInitialTemperature] = useState("");
  const [initialState, setInitialState] = useState("");

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a1ec0ef7b4991a5044c0c5f3af8fc2a`
      );
      const kelvin = response.data.main.temp;
      const celsius = kelvin - 273.15;
      setResult(`Temperature at ${city}\n${Math.round(celsius)}°C`);
      setInitialCity(city);
      setInitialTemperature(`${Math.round(celsius)}°C`);
      setInitialState(response.data.sys.country);
    } catch (error) {
      console.log(error);
      setResult(
        "Error fetching data. Please check the city name and try again."
      );
    }
    setCity("");
  };

  return (
    <Container component="main" maxWidth="sm" style={{ marginTop: 200 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 8,
          boxShadow: 3,
          padding: 4,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" gutterBottom>
          <CloudIcon fontSize="large" style={{ marginRight: 10 }} />
          Weather App
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="text"
            name="city"
            label="Enter place name"
            variant="outlined"
            margin="normal"
            onChange={handleInputChange}
            value={city}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Get Temperature
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="h6">Initial City: {initialCity}</Typography>
          <Typography variant="h6">
            Initial Temperature: {initialTemperature}
          </Typography>
          <Typography variant="h6">Initial State: {initialState}</Typography>
          <Typography variant="h6">{result}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default WeatherApp;
