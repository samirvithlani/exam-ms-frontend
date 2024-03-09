import React, { useEffect, useState } from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

function MCQQuestion({ question, options }) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {options.map((option, index) => (
            <ListItem key={index}>
              <ListItemText primary={`• ${option}`} />

            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

function App() {
    const [question,setquestion] = useState([])
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData = async() =>{
      const response = await  axios.get('/mcq')
      setquestion(response.data)
    }


  return (
    <div>
      {question.map((question, index) => (
        <MCQQuestion 
          key={index}
          question={question.question} 
          options={[
            question.Option1,
            question.Option2,
            question.Option3,
            question.Option4
          ]} 
        />
      ))}
    </div>
  );
}

export default App;
