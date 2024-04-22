import React, { useState, useEffect } from 'react';
import { Grid, Box, List, ListItem, ListItemText, Avatar } from '@mui/material'; // Removed IconButton import
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const SubjectList     = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setsubjects] = useState([]);

  useEffect(() => {
    fetchsubject();
  }, [id]);
  const fetchsubject = async () =>{
    try {
      const response = await axios.get("/subject");
      console.log(response.data,"data");
      setsubjects(response.data)
    } catch (error) {
      console.log(error,"error");
    }
   
  }
  const handleClick = (subjectID) => {
    console.log("Clicked on exam ID:", subjectID);
  navigate(`/adminDashboard/subject/${subjectID}`)
  };

  const getAvatarLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <Grid container spacing={2} style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
      {subject && (
        <Grid item xs={12}>
          <List style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {subject.map((item) => (
              <ListItem key={item._id} style={{ backgroundColor: '#ffffff', borderRadius: '10px', margin: '5px', padding: '10px', textAlign: 'center' }}>
                <Avatar >{getAvatarLetter(item.name)}</Avatar>
                <ListItemText primary={item.name} onClick={()=>handleClick(item._id)} />
                {/* <div onClick={() => handleClick(item._id)} style={{ cursor: 'pointer' }}> */}
                  {/* Your clickable content */}
                  {/* Click me
                </div> */}
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
    </Grid>
  );
};
