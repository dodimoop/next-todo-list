"use client";
import { useState, FC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, styled, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import TodoListPage from '../components/TodoListPage';
import AddNewTaskModal from '../components/AddNewTaskModal';
import { Close } from '@mui/icons-material';
import ButtonPS from '@/components/Button';

const Home: FC = () => {
  const [todos, setTodos] = useState<{ id: number; task: string; completed: boolean }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editTodoText, setEditTodoText] = useState<string>('');

  const addTodo = (task: string) => {
    const newTodo = { id: Date.now(), task, completed: false };
    setTodos([...todos, newTodo]);
    setShowModal(false);
  };

  const editTodo = (id: number) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setEditTodoId(id);
      setEditTodoText(todoToEdit.task);
      setShowModal(true);
    }
  };

  const saveEditTodo = () => {
    if (editTodoId !== null) {
      setTodos(todos.map(todo => {
        if (todo.id === editTodoId) {
          return { ...todo, task: editTodoText };
        }
        return todo;
      }));
      setEditTodoId(null);
      setEditTodoText('');
      setShowModal(false);
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const checkTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
      width: '100%',
    },
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const handleClickOpen = () => {
    setShowModal(true);
  };
  
  const handleClose = () => {
    setEditTodoId(null);
    setEditTodoText('');
    setShowModal(false);
  };

  return (
    <Box className="h-screen flex justify-center items-center">
      <Box className="w-full max-w-screen-md p-4">
        <Box className="text-center text-2xl">ToDo List</Box>
        <Box className="flex justify-center items-center py-4">
          <ButtonPS size="large" variant="outlined" onClick={handleClickOpen} endIcon={<AddIcon />}>Add New Task</ButtonPS>
        </Box>
        <TodoListPage todos={todos} onEdit={editTodo} onDelete={deleteTodo} onCheck={checkTodo} />
        <BootstrapDialog open={showModal} onClose={handleClose}>
          <DialogTitle>{editTodoId ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
            <Close />
          </IconButton>
          <DialogContent dividers>
            <AddNewTaskModal
              onAdd={addTodo}
              initialText={editTodoText}
              onSave={saveEditTodo}
            />
          </DialogContent>
        </BootstrapDialog>
      </Box>
    </Box>
  );
};

export default Home;