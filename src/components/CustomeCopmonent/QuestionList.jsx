  import React, { useState } from 'react';
  import { Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup, IconButton } from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import DeleteIcon from '@mui/icons-material/Delete';

  const QuestionList = ({ question, type, options ,onDelete} ) => {
    const [expanded, setExpanded] = useState(false);
    const maxLength = 50; // Define the maximum length of the question before truncation

    const handleChange = () => {
      setExpanded(!expanded);
    };

    const renderOptions = () => {
      switch (type) {
        case 'MCQ':
          return (
            <RadioGroup>
              {options.map((option, index) => (
                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          );
        case 'Multiple':
          return (
            <FormGroup>
              {options.map((option, index) => (
                <FormControlLabel key={index} control={<Checkbox />} label={option} />
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
              primary={<div dangerouslySetInnerHTML={{ __html: `• ${option}` }} />}
              />
              </ListItem>
              ))}
            </List>
          );
      }
    };

    const getTruncatedQuestion = () => {
      if (question.length > maxLength && !expanded) {
        return `${question.substring(0, maxLength)}...`;
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
          <Typography dangerouslySetInnerHTML={{ __html: getTruncatedQuestion() }} />
          <IconButton edge="end" aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>

        </AccordionSummary>
        <AccordionDetails>
          {renderOptions()}
        </AccordionDetails>
      </Accordion>
    );
  };

  export default QuestionList;
