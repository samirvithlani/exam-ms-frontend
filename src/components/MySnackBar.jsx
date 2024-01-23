import React from "react";
import SnackbarContent from "@mui/material/SnackbarContent";
import { Button, Stack } from "@mui/material";

export const MySnackBar = () => {
  const action = (
    <Button color="secondary" size="small">
      lorem ipsum dolorem
    </Button>
  );
  return (
    <Stack spacing={2} sx={{ maxWidth: "100%",mb:1 }}>
      <SnackbarContent
        sx={{ backgroundColor: "rgb(103,58,183)" ,fontFamily:"Lato",fontSize:"15px",fontWeight:"bold" }}
        message="Use this page for adding Manual Question and also upload excel file in given formate this will add question directly to questions database"
        // action={action}
      />
    </Stack>
  );
};
