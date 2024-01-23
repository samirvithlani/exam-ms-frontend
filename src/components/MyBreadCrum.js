import { Breadcrumbs, Link } from "@mui/material";
import React from "react";

export const MyBreadCrum = () => {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
      </Breadcrumbs>
    </div>
  );
};
