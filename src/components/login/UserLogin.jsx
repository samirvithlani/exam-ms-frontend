import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Paper,
  Button,
  TextField,
  Dialog,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
//import CustomEvents from "./Events";
const UserLogin = () => {
  const navigate = useNavigate();
  // const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [open, setOpen] = React.useState(false);
  const [responseData, setResponseData] = useState(null);
  const [valueTab, setValueTab] = useState("1");
  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [open1, setOpen1] = useState(false);

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const sub = async () => {
    // CustomEvents.emit(CustomEvents.Events.PREFERENCE, {
    //   preference: ["a0", "b0"],
    // });
    await axios
      .post(
        "auth/AddAuth",
        {
          email: email,
          name: name,
          loginId: loginId,
          password: password,
        },
        { withCredentials: false }
      )
      .then((res) => {
      })
      .catch((err) => {
      });
  };
  const subLogin = async () => {
    // CustomEvents.emit(
    //   CustomEvents.Events.PREFERENCE,

    //   {
    //     email: "Unada@gmai.com",
    //     name: "unada",
    //   }
    // );
    await axios
      .post("auth/login", {
        loginId: emailLogin,
        password: passwordLogin,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Login Successful");
          navigate("/home");
        }
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setEmail("");
    setPassword("");
    setName("");
    setLoginId("");
  };
  return (
    <Paper elevation={0}>
      <Grid container mt={5}>
        <Grid xl={6} lg={6}>
          <Button variant="contained" onClick={handleOpen1}>
            Login
          </Button>
        </Grid>
        <Box mt={10}>
          <Dialog
            open={open1}
            onClose={handleClose1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box
              mt={5}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              {/* <form onSubmit={handleSubmit}> */}
              <TextField
                label="emailLogin"
                id="emailLogin"
                value={emailLogin}
                onChange={(event) => setEmailLogin(event.target.value)}
              />
              <br />
              <br />
              <TextField
                label="passwordLogin"
                id="passwordLogin"
                value={passwordLogin}
                onChange={(event) => setPasswordLogin(event.target.value)}
              />
              <br />
              <br />
              <Button onClick={subLogin} variant="contained">
                Login
              </Button>
              {/* </form> */}
            </Box>
          </Dialog>
        </Box>
        <Grid xl={6} lg={6}>
          <Button variant="contained" onClick={handleOpen}>
            Register
          </Button>
        </Grid>
      </Grid>
      <Box mt={10}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box mt={5} sx={{ display: "flex", justifyContent: "space-around" }}>
            <TextField
              label="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <br />
            <TextField
              label="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <br />
            <TextField
              label="name"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <br />
            <br />
            <TextField
              label="loginId"
              id="loginId"
              value={loginId}
              onChange={(event) => setLoginId(event.target.value)}
            />
            <br />
            <br />
            <Button onClick={sub} variant="contained">
              Login
            </Button>
          </Box>
        </Dialog>
      </Box>
      <TabContext value={valueTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab ">
            <Tab label="Login" value="1" />
            <Tab
              label="Register"
              value="2"
              // onClick={() => setView(!view)}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Table sx={{ minWidth: 750 }} size="small" aria-label="a dense table">
            <TableBody>
              <TableRow
                key={name}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <Box
                  mt={5}
                  sx={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* <form onSubmit={handleSubmit}> */}
                  <TextField
                    label="emailLogin"
                    id="emailLogin"
                    value={emailLogin}
                    onChange={(event) => setEmailLogin(event.target.value)}
                  />
                  <br />
                  <br />
                  <TextField
                    label="passwordLogin"
                    id="passwordLogin"
                    value={passwordLogin}
                    onChange={(event) => setPasswordLogin(event.target.value)}
                  />
                  <br />
                  <br />
                  <Button onClick={subLogin} variant="contained">
                    Login
                  </Button>
                  {/* </form> */}
                </Box>
              </TableRow>
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value="2">
          <Table sx={{ minWidth: 750 }} size="small" aria-label="a dense table">
            <TableBody>
              <TableRow
                key={name}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <Box
                  mt={5}
                  sx={{ display: "flex", justifyContent: "space-around" }}
                >
                  <TextField
                    label="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <br />
                  <br />
                  <TextField
                    label="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <br />
                  <br />
                  <TextField
                    label="name"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <br />
                  <br />
                  <TextField
                    label="loginId"
                    id="loginId"
                    value={loginId}
                    onChange={(event) => setLoginId(event.target.value)}
                  />
                  <br />
                  <br />
                  <Button onClick={sub} variant="contained">
                    Register
                  </Button>
                </Box>
              </TableRow>
            </TableBody>
          </Table>
        </TabPanel>
      </TabContext>
    </Paper>
  );
};

export default UserLogin;