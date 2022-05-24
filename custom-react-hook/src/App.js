import './App.css';
import React from 'react';
import useRandomUser from './useRandomUser';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';

function App() {
  
  const [location, setLocation] = React.useState(localStorage.getItem('location') || '');

  const handleChange = (event) => {
    setLocation(event.target.value);
    localStorage.setItem('location', event.target.value);
  };

  // useRandomUser hook generates random user profile
  const user = useRandomUser(location);

  function randomize() {
    window.location.reload();
  }

  function downloadJSON() {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(parsedUser)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "random-user-profile.json";

    link.click();
  }

  const [parsedUser, setParsedUser] = React.useState(null);

  React.useEffect(() => {
    setParsedUser(JSON.parse(user));
  }, [user])

  function userProfile(parsedUser) {
    if (parsedUser === null) {
      // console.log("loading")
      return (
        <div>
          Loading...
        </div>
      );
    }
    return (
      <div>
        <p>Name: {parsedUser.name}</p>
        <p>Profile Picture:</p>
        <img src={parsedUser.imageURL} alt='profile pic'></img>
        <p>Age: {parsedUser.age}</p>
        <p>Birthday: {parsedUser.birthday}</p>
        <p>Company: {parsedUser.company}</p>
        <p>Music: {parsedUser.music}</p>
        <p>Phone Number: {parsedUser.phone}</p>
        <p>Job Info: {parsedUser.job}</p>
        <p>Personal Vehicle: {parsedUser.vehicle}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Random User Profile Generator</h1>
      <p>Choose location for the random user:</p>
      <Box sx={{ maxWidth: 300, mx: "auto" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={location}
            label="location"
            onChange={handleChange}
          >
            <MenuItem value="ar">ar	Arabic</MenuItem>
            <MenuItem value="de">de	German</MenuItem>
            <MenuItem value="de_AT">de_AT German (Austria)</MenuItem>
            <MenuItem value="de_CH">de_CH	German (Switzerland)</MenuItem>
            <MenuItem value="el">el	Greek</MenuItem>
            <MenuItem value="en">en	English</MenuItem>
            <MenuItem value="en_AU">en_AU	English (Australia)</MenuItem>
            <MenuItem value="en_US">en_US	English (United States)</MenuItem>
            <MenuItem value="es">es Spanish</MenuItem>
            <MenuItem value="es_MX">es_MX Spanish (Mexico)</MenuItem>
            <MenuItem value="fr">fr French</MenuItem>
            <MenuItem value="fr_CA">fr_CA French (Canada)</MenuItem>
            <MenuItem value="ko">ko Korean</MenuItem>
            <MenuItem value="ja">ja Japanese</MenuItem>
            <MenuItem value="it">it	Italian</MenuItem>
            <MenuItem value="zh_CN">zh_CN Chinese</MenuItem>
            <MenuItem value="zh_TW">zh_TW	Chinese (Taiwan)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {userProfile(parsedUser)}
      <Container sx={{mt: 4}}>
        <Button sx={{ mr: 4 }} variant="contained" onClick={randomize}>Randomize user</Button>
        <Button variant="outlined" onClick={downloadJSON}>Download JSON</Button>
      </Container>
      <Container sx={{mt: 8, mb: 4}}>© Copyright 2022, Zhaohang Yan. All Rights Reserved.</Container>
    </div>
  );
}

export default App;