import React, { useState } from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie';
import PreWrapper from './PreWrapper'; // Adjust the import path as needed

const QuestionList = ({ question, type, options, onDelete, questionNumber }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 50; // Define the maximum length of the question before truncation
  const role = Cookies.get('role'); // Assuming the role is stored in a cookie

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const renderOptions = () => {
    switch (type) {
      case 'MCQ':
        return (
          <RadioGroup>
            {options.map((option, index) => (
              <FormControlLabel key={index} value={option} control={<Radio />} label={<PreWrapper htmlContent={option} />} />
            ))}
          </RadioGroup>
        );
      case 'Multiple':
        return (
          <FormGroup>
            {options.map((option, index) => (
              <FormControlLabel key={index} control={<Checkbox />} label={<PreWrapper htmlContent={option} />} />
            ))}
          </FormGroup>
        );
      case 'TrueFalse':
        return (
          <RadioGroup>
            <FormControlLabel value="True" control={<Radio />} label="True" />
            <FormControlLabel value="False" control={<Radio />} label="False" />
          </RadioGroup>
        );
      default:
        return (
          <List>
            {options.map((option, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={<PreWrapper htmlContent={`• ${option}`} />}
                />
              </ListItem>
            ))}
          </List>
        );
    }
  };

  const getTruncatedQuestion = () => {
    if (question.length > maxLength && !expanded) {
      return `${question.substring(0, maxLength)}...`
    }
    return question;
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        {role === "superAdmin" && (
          <IconButton edge="start" aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        )}
        <Typography variant="body1" style={{ marginRight: 10 }}>{questionNumber}.</Typography>
        <PreWrapper htmlContent={getTruncatedQuestion()} />
      </AccordionSummary>
      <AccordionDetails>{renderOptions()}</AccordionDetails>
    </Accordion>
  );
};

export default QuestionList;
