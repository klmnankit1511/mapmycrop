import React, { useState } from "react";
import { useHistory } from 'react-router-dom'; // Import useHistory
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios  from "axios";



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const [error, setError] = useState("");
    const history = useHistory(); // Initialize useHistory
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var username = data.get("username");
    var password = data.get("password");
    var firstname = data.get("firstName");
    var lastname = data.get("lastName");

    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   firstname: data.get('firstName'),
    //   lastname: data.get('lastName'),
    // });
    try {
      if (
        username.length >= 4 &&
        password.length >= 8 &&
        firstname.length > 0 &&
        lastname.length > 0
      ) {
        var formdata = {
          username: username,
          password: password,
          name: firstname + " " + lastname,
        };
        const response = await axios
          .post("http://localhost:8000/signup/", formdata)
          .then((res) => {
            console.log(res.data["msg"]);
            if(res.data["msg"] == "Username is already taken"){
              setError("Username is already taken. Try Another one")
            }
            else if(res.data["msg"] == "User created successfully"){
              alert("User created successfully")
              history.push('/');
            }
            
            
            

          });

        // console.log("access_token-->",access_token);
        //   history.push('/dashboard'); // Redirect to dashboard or any other route
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            {error}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
