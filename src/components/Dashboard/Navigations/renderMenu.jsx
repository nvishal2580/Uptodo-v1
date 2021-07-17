import React, { useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";
function renderMenu({ handleMenuClose, isMenuOpen, anchorEl }) {
  const menuId = "primary-search-account-menu";

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
}

export default renderMenu;
