import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        mr: `${drawerWidth}px`,
        background: "#fff",
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: "#aaa" }}>
          User
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
