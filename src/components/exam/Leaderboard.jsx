import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, IconButton, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Chart } from 'react-charts';
import { CustomeLoader } from '../Layouts/CustomeLoader';
import { constant } from '../../constant';

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
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState('');

  useEffect(() => {
    fetchData();
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const result = await axios.get('/contest');
      console.log("Fetched contests:", result.data);
      setContests(result.data);
    } catch (error) {
      console.error("Error fetching contests:", error);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get('/leaderboard');
      console.log("Fetched leaderboard data:", result.data);
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

  const handleRefresh = async () => {
    setSelectedContest('');
    await fetchContests();
    await fetchData();
  };

  const handleContestChange = (event) => {
    setSelectedContest(event.target.value);
  };

  const filteredData = selectedContest
    ? data.filter(item => item?.contestparticipant?.contest?._id === selectedContest )
    : data.filter(item=>item?.contestparticipant?.contest?.isActive === true);
    
  const chartData = useMemo(() => [
    {
      label: 'Scores',
      data: filteredData.map(item => ({
        user: `${item?.contestparticipant?.userId?.firstname} ${item?.contestparticipant?.userId?.lastname}`,
        score: item?.contestparticipant?.score,
      })),
    },
  ], [filteredData]);

  const chartSeries = useMemo(() => ({
    type: 'bar',
  }), []);

  const chartAxes = useMemo(() => [
    { primary: true, type: 'ordinal', position: 'bottom', key: 'user' },
    { type: 'linear', position: 'left', key: 'score' },
  ], []);

  return (
    <StyledTableContainer component={Paper}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ color: constant.backgroundColor }}>Leaderboard</Typography>
        <Box display="flex" alignItems="center">
          <Select
            value={selectedContest}
            onChange={handleContestChange}
            displayEmpty
            sx={{ minWidth: 200, marginRight: 2 }}
          >
            <MenuItem value=""><em>All Contests</em></MenuItem>
            {contests.map(contest => (
              <MenuItem key={contest._id} value={contest._id}>{contest.name}</MenuItem>
            ))}
          </Select>
          <IconButton onClick={handleRefresh} color="primary" aria-label="refresh leaderboard">
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: constant.backgroundColor, color: 'white' }}>Rank</TableCell>
            <TableCell sx={{ backgroundColor: constant.backgroundColor, color: 'white' }}>Contest Name</TableCell>
            <TableCell sx={{ backgroundColor: constant.backgroundColor, color: 'white' }}>User Name</TableCell>
            <TableCell sx={{ backgroundColor: constant.backgroundColor, color: 'white' }}>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && <CustomeLoader />}
          {filteredData.map((item, index) => (
            <StyledTableRow key={item?._id}>
              <StyledTableCell>{index + 1}</StyledTableCell>
              <StyledTableCell>{item?.contestparticipant?.contest?.name}</StyledTableCell>
              <StyledTableCell>{`${item?.contestparticipant?.userId?.firstname} ${item?.contestparticipant?.userId?.lastname}`}</StyledTableCell>
              <StyledTableCell>{item?.contestparticipant?.score}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
     
    </StyledTableContainer>
  );
};

export default Leaderboard;
