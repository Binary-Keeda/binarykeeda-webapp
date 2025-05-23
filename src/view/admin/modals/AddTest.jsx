import { Close } from '@mui/icons-material';
import { TextField, IconButton, Button, Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { BASE_URL } from '../../../lib/config';
import axios from 'axios'
import Cookies from 'js-cookie';
export default function AddTest({ setModalClose }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const testData = {
      name,
      duration: Number(duration),
      description,
    };

 

    console.log("W1")
    const token = Cookies.get('token'); // Or however you store the JWT
    console.log("e2")
    axios.post(
      `${BASE_URL}/api/v2/test/create`,
      testData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },withCredentials:true
      }
    )
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
    
    setModalClose(false); // Close modal on submit
  };

  return (
    <section className='fixed flex justify-center items-center top-0 left-0 z-50 h-screen w-screen bg-black bg-opacity-50'>
      <Box className="relative bg-white rounded-lg p-6 w-[400px] shadow-lg">
        {/* Close Button */}
        <div className='flex justify-end'>
          <IconButton 
            className="absolute top-2 right-2"
            onClick={() => setModalClose(false)}
          >
            <Close />
          </IconButton>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} mt={2}>
            <TextField 
              autoFocus 
              variant='standard' 
              label="Test Name" 
              fullWidth 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <TextField 
              variant='standard' 
              type='number' 
              label="Duration (minutes)" 
              fullWidth 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)} 
            />
            <TextField 
              variant='standard' 
              label="Test Description" 
              multiline 
              rows={3} 
              fullWidth 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />

            <Button type="submit" variant="contained" color="primary">
              Create Test
            </Button>
          </Stack>
        </form>
      </Box>
    </section>
  );
}
