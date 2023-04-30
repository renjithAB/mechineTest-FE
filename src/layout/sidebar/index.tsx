import React from "react";

import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Collapse from "@mui/material/Collapse";
import Toolbar from "@mui/material/Toolbar";

import { NavLink } from "react-router-dom";

function SideNav() {
  const drawerWidth = 240;
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#0D7B58",
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Toolbar />

      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText sx={{ color: "#fff" }} primary={text} />
              <ListItemIcon sx={{ color: "#fff" }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItemButton onClick={handleClick}>
          {open ? (
            <ExpandLess sx={{ color: "#fff" }} />
          ) : (
            <ExpandMore sx={{ color: "#fff" }} />
          )}
          <ListItemText sx={{ color: "#fff" }} primary="News" />
          <ListItemIcon>
            <InboxIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: "#fff" }} />
              </ListItemIcon>
              <NavLink to="/add-news">
                <ListItemText sx={{ color: "#fff" }} primary="Add News" />
              </NavLink>
            </ListItemButton>
          </List>

          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: "#fff" }} />
              </ListItemIcon>
              <NavLink to="/manage-news">
                <ListItemText sx={{ color: "#fff" }} primary="Manage News" />
              </NavLink>
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={handleClick1}>
          {open1 ? (
            <ExpandLess sx={{ color: "#fff" }} />
          ) : (
            <ExpandMore sx={{ color: "#fff" }} />
          )}
          <ListItemText sx={{ color: "#fff" }} primary="Announcements" />
          <ListItemIcon>
            <InboxIcon sx={{ color: "#fff" }} />
          </ListItemIcon>
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: "#fff" }} />
              </ListItemIcon>
              <NavLink to="/add-news">
                <ListItemText
                  sx={{ color: "#fff" }}
                  primary="Add Announcements"
                />
              </NavLink>
            </ListItemButton>
          </List>

          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder sx={{ color: "#fff" }} />
              </ListItemIcon>
              <NavLink to="/manage-news">
                <ListItemText
                  sx={{ color: "#fff" }}
                  primary="Manage Announcements"
                />
              </NavLink>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
}

export default SideNav;
