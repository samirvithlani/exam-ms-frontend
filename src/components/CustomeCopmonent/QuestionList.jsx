import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const QuestionList = ({ question, type, options }) => {
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
                <ListItemText primary={`• ${option}`} />
              </ListItem>
            ))}
          </List>
        );
    }
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        <div dangerouslySetInnerHTML={{ __html: question }} />

        {/* <Typography>{question}</Typography> */}
      </AccordionSummary>
      <AccordionDetails>
        {renderOptions()}
      </AccordionDetails>
    </Accordion>
  );
};

export default QuestionList;
