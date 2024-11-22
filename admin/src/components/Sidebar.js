import React from 'react';
import { List, ListItem, ListItemText, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240 }}>
      <List>
        <ListItem component={Link} to="/" button>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/categories" button>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem component={Link} to="/products" button>
          <ListItemText primary="Products" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
