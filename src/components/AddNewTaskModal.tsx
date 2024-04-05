"use client";
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import ButtonPS from './Button';

interface Props {
  onAdd: (task: string) => void;
  initialText: string;
  onSave: () => void;
}

const AddNewTaskModal: React.FC<Props> = ({ onAdd, initialText, onSave }) => {
  const [task, setTask] = useState(initialText);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (task.trim() !== '') {
      onAdd(task);
      onSave();
    }
  };

  return (
    <Box className="flex justify-center text-center">
      <TextField
          size="small"
          fullWidth
          value={task}
          onChange={(e) => setTask(e.target.value)}
          variant="outlined"
          placeholder="Enter task"
          autoFocus
        />
        <Box className="px-2">
          <ButtonPS variant="contained" disableRipple onClick={(e) => handleSubmit(e)}>Save</ButtonPS>
        </Box>
    </Box>
  );
};

export default AddNewTaskModal;