import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Grid, Typography, TextField, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { CustomeLoader } from '../Layouts/CustomeLoader';

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [creditToAdd, setCreditToAdd] = useState('');
  const [user, setUser] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [students, searchTerm, sortOrder, filterCriteria]);

  const fetchdata = async () => {
    setIsLoading(true);
    let response = await axios.get('/user');
    const facultyData = response.data.filter(user => user.role.role === 'student');
    let filterdata = facultyData.map((faculty, index) => ({
      id: faculty._id,
      displayid: index + 1,
      firstname: faculty.firstname,
      email: faculty.email,
      role: faculty.role?.role,
      status: faculty.status,
      credit: faculty.credit // Assuming each user object has a 'credit' property
    }));
    setStudents(filterdata);
    setIsLoading(false);
  }

  const handleAddCredit = async (userId) => {
    const user = await axios.get(`/user/${userId}`);
    setUser(user.data.wallet._id);
    if (user) {
      const data = { token: user.data.wallet.token + parseFloat(creditToAdd) };
      const addcredit = await axios.put(`/wallet/${user}`, data);
    }
    setCreditToAdd('');
    setSelectedUserId(null);
  }

  const applyFilters = () => {
    let tempStudents = [...students];

    if (searchTerm) {
      tempStudents = tempStudents.filter(student =>
        student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCriteria === 'a-z') {
      tempStudents.sort((a, b) => a.firstname.localeCompare(b.firstname));
    } else if (filterCriteria === 'recently_added') {
      tempStudents.sort((a, b) => b.displayid - a.displayid);
    }

    setFilteredStudents(tempStudents);
  };

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: "auto", backgroundColor: "white", m1: 2 }} className="responsive-container">
      {isLoading && <CustomeLoader />}

      <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "Lato",mb:1,color:"#010080" }}>Student List ::</Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="a-z">A to Z</MenuItem>
              <MenuItem value="recently_added">Recently Added</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredStudents.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student.id}>
            <Card sx={{ backgroundColor: '#f0f0f0', boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ textTransform: 'uppercase', color: '#010080' }}>
                  {student.firstname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {student.email}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  Role: {student.role}
                </Typography> */}
                <Typography variant="body2" color="text.secondary">
                  Status: {student.status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Credit: {student.credit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Contact: {student.contact}
                </Typography>
              </CardContent>
              <CardActions>
                <TextField
                  size="small"
                  value={selectedUserId === student.id ? creditToAdd : ''}
                  onChange={(e) => {
                    setCreditToAdd(e.target.value);
                    setSelectedUserId(student.id);
                  }}
                  placeholder="Add Credit"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddCredit(student.id)}
                  disabled={!creditToAdd || selectedUserId !== student.id}
                  sx={{ ml: 1 }}
                >
                  Add
                </Button>
                <Link to={`../studentDetail/${student.id}`} style={{ textDecoration: 'none' }}>DETAIL</Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default StudentList;
