import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Select, Checkbox, ListItemText, FormControl, InputLabel, OutlinedInput, Box, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CreateContest = () => {
  const [name, setName] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);
  const [prizeTypes, setPrizeTypes] = useState([]);
  const [selectedPrizeType, setSelectedPrizeType] = useState('');
  const [prizeValue, setPrizeValue] = useState('');

  useEffect(() => {
    fetchSubject();
    fetchPrizeTypes();
  }, []);

  const fetchSubject = async () => {
    try {
      const response = await axios.get('/subject');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  useEffect(() => {
    if (selectedSubjects.length > 0) {
      fetchExams(selectedSubjects.map(subject => subject?._id)); 
    } else {
      setExams([]);
    }
  }, [selectedSubjects]);

  const fetchExams = async (subjectIds) => {
    try {
      const response = await axios.post('/getexams', { subjects: subjectIds });
      const contestExam = response.data.filter(exam => exam?.isContestExam===true)
      setExams(contestExam);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const fetchPrizeTypes = async () => {
    try {
      const response = await axios.get('/prizetype');
      setPrizeTypes(response?.data?.data);
    } catch (error) {
      console.error('Error fetching prize types:', error);
    }
  };

  const handleSubjectChange = (event) => {
    const { target: { value } } = event;
    setSelectedSubjects(value);
    setSelectedExams([]);
  };

  const handleExamChange = (event) => {
    const { target: { value } } = event;
    setSelectedExams(value);
  };

  const handlePrizeTypeChange = (event) => {
    setSelectedPrizeType(event.target.value);
    setPrizeValue('');
  };

  const handlePrizeValueChange = (event) => {
    setPrizeValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedSubjectIds = selectedSubjects.map(subject => subject?._id);
    const selectedExamIds = selectedExams.map(exam => exam?._id);
    const contestData = {
      name: name,
      subject: selectedSubjectIds,
      exam: selectedExamIds,
      startDate: dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss[Z]'),
      endDate: dayjs(endDate).format('YYYY-MM-DDTHH:mm:ss[Z]'),
      prizetype: selectedPrizeType,
      isActive: true
    };

    if (prizeTypes.find(prizeType => prizeType._id === selectedPrizeType).name === 'Cash') {
      contestData.amount = prizeValue;
    } else if (prizeTypes.find(prizeType => prizeType._id === selectedPrizeType).name === 'Coupon') {
      contestData.cupponCode = prizeValue;
    }

    try {
      const response = await axios.post('/contest', contestData); 
      setName('');
      setSelectedSubjects([]);
      setSelectedExams([]);
      setStartDate(dayjs());
      setEndDate(dayjs());
      setSelectedPrizeType('');
      setPrizeValue('');
      toast.success('Contest created successfully');
    } catch (error) {
      console.error('Error creating contest:', error);
      toast.error('Error creating contest');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '400px', margin: 'auto', mt: 5 }}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormControl variant="outlined">
          <InputLabel>Subject</InputLabel>
          <Select
            multiple
            value={selectedSubjects}
            onChange={handleSubjectChange}
            input={<OutlinedInput label="Subject" />}
            renderValue={(selected) => selected.map(subject => subject.name).join(', ')}
          >
            {subjects.map((subject) => (
              <MenuItem key={subject._id} value={subject}>
                <Checkbox checked={selectedSubjects.some(selected => selected._id === subject._id)} />
                <ListItemText primary={subject.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel>Exam</InputLabel>
          <Select
            multiple
            value={selectedExams}
            onChange={handleExamChange}
            input={<OutlinedInput label="Exam" />}
            renderValue={(selected) => selected.map(exam => exam.name).join(', ')}
            disabled={selectedSubjects.length === 0}
          >
            {exams.map((exam) => (
              <MenuItem key={exam._id} value={exam}>
                <Checkbox checked={selectedExams.some(selected => selected._id === exam._id)} />
                <ListItemText primary={exam.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DateTimePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />

        <DateTimePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />

        <FormControl variant="outlined">
          <InputLabel>Prize Type</InputLabel>
          <Select
            value={selectedPrizeType}
            onChange={handlePrizeTypeChange}
            input={<OutlinedInput label="Prize Type" />}
          >
            {prizeTypes.map((prizeType) => (
              <MenuItem key={prizeType._id} value={prizeType._id}>
                {prizeType.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {prizeTypes.find(prizeType => prizeType._id === selectedPrizeType)?.name === 'Cash' && (
          <TextField
            label="Cash Amount"
            variant="outlined"
            value={prizeValue}
            onChange={handlePrizeValueChange}
            type="number"
          />
        )}

        {prizeTypes.find(prizeType => prizeType._id === selectedPrizeType)?.name === 'Coupon' && (
          <TextField
            label="Coupon Code"
            variant="outlined"
            value={prizeValue}
            onChange={handlePrizeValueChange}
          />
        )}

        <Button type="submit" variant="contained" color="primary">
          Create Contest
        </Button>

        <ToastContainer />
      </Box>
    </LocalizationProvider>
  );
};
