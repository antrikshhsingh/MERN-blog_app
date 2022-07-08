import React, { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [value, setvalue] = useState(0);

  const navigation = useNavigate();
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,108,1) 17%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h5">BlogsApp</Typography>
        <Box marginLeft={"auto"} marginRight={"auto"}>
          <Tabs
            textColor="inherit"
            value={value}
            onChange={(e, val) => setvalue(val)}
          >
            <Tab LinkComponent={Link} to="/blogs" label="All BLogs" />
            <Tab LinkComponent={Link} to="/myblogs" label="My BLogs" />
          </Tabs>
        </Box>
        <Box display="flex" marginLeft="auto">
          <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            color="warning"
            sx={{ margin: 1, borderRadius: 10 }}
          >
            Login
          </Button>
          <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            color="warning"
            sx={{ margin: 1, borderRadius: 10 }}
          >
            Signup
          </Button>
          <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            color="warning"
            sx={{ margin: 1, borderRadius: 10 }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
