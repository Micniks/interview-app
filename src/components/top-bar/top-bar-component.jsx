import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import TrackmanLogo from "../../assets/images/trackman-logo.png";
import "./styles.css";
import { useNavigate, Link, useLocation } from "react-router";

const navItems = [
  { name: "Facilities", link: "/facilities" }, //Default Choice
  { name: "Locations", link: "/locations" },
  { name: "Players", link: "/players" },
  { name: "Access Management", link: "/access-managment" },
];

function AppTopBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToPage = (link) => {
    navigate(link);
  };

  // Display the active page in highlighted color
  const buttonTextColor = (navItem) => {
    if (navItem.name == "Facilities" && location.pathname == "/")
      return "var(--color-text-neutral-on-neutral)";
    else
      return navItem.link == location.pathname
        ? "var(--color-text-neutral-on-neutral)"
        : "var(--color-text-neutral-tertiary)";
  };

  // TODO - 12-09-2025 - MUK: Currently using Material UI AppBar with simple modification,
  // but would be better to make custom one from scrath if there is time, to more closely match
  // design UI from figma.
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{ bgcolor: "var(--color-background-brand-default)", whiteSpace: "nowrap"}}
      >
        <Toolbar back="true" className="toolbar">
          <Link to="https://www.trackman.com/">
            <img src={TrackmanLogo} className="logo" alt="Trackman Logo" />
          </Link>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                className="menuButton"
                onClick={() => {
                  navigateToPage(item.link);
                }}
                sx={{
                  color: buttonTextColor(item),
                  fontFamily: "sans-serif",
                  marginRight: "32px",
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppTopBar;
