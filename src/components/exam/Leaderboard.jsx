import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CustomeLoader } from "../Layouts/CustomeLoader";
import { constant } from "../../constant";

const StyledTableContainer = styled(TableContainer)({
  marginTop: "20px",
  padding: "20px",
});

const StyledTableCell = styled(TableCell)({
  fontSize: "16px",
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get("/leaderboard");
      if (result.status === 200) {
        setIsLoading(false);
      }
      const sortedData = result.data.sort((a, b) => {
        if (b?.contestparticipant?.score !== a?.contestparticipant?.score) {
          return b?.contestparticipant?.score - a.contestparticipant?.score;
        }
        const nameA =
          `${a?.contestparticipant?.userId?.firstname} ${a?.contestparticipant?.userId?.lastname}`.toLowerCase();
        const nameB =
          `${b?.contestparticipant?.userId?.firstname} ${b?.contestparticipant?.userId?.lastname}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      setData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: constant.backgroundColor, // Change this to your desired color
      },
    },
  });
  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledTableContainer component={Paper}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" align="center" sx={{ marginBottom: "20px",color:constant.backgroundColor }}>
            Leaderboard
          </Typography>
          <IconButton
            onClick={fetchData}
            color="primary"
            aria-label="refresh leaderboard"
          >
            <RefreshIcon />
          </IconButton>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: constant.backgroundColor, color: "white" }}>
                Rank
              </TableCell>
              <TableCell sx={{ backgroundColor: constant.backgroundColor, color: "white" }}>
                Contest Name
              </TableCell>
              <TableCell sx={{ backgroundColor: constant.backgroundColor, color: "white" }}>
                User Name
              </TableCell>
              <TableCell sx={{ backgroundColor: constant.backgroundColor, color: "white" }}>
                Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && <CustomeLoader />}
            {data.map((item, index) => (
              <StyledTableRow key={item?._id}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>
                  {item?.contestparticipant?.contest?.name}
                </StyledTableCell>
                <StyledTableCell>{`${item?.contestparticipant?.userId?.firstname} ${item?.contestparticipant?.userId?.lastname}`}</StyledTableCell>
                <StyledTableCell>
                  {item?.contestparticipant?.score}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </ThemeProvider>
  );
};

export default Leaderboard;
