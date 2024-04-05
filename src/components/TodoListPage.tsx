import React from 'react';
import { Box, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onCheck: (id: number) => void;
}

const TodoListPage: React.FC<Props> = ({ todos, onEdit, onDelete, onCheck }) => {
  return (
    <Box style={{visibility: todos.length ? 'visible' : 'hidden'}}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>TASKS</TableCell>
                  <TableCell align="right">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {todos?.map((todo) => (
                  <TableRow
                    key={todo?.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box className="flex items-center">
                        <Checkbox onChange={() => onCheck(todo?.id)} />
                        <Typography style={{ textDecoration: todo?.completed ? 'line-through' : 'none', color: todo?.completed ? 'red' : 'inherit' }}>
                          {todo?.task}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size='small' color='secondary' onClick={() => onEdit(todo?.id)} disabled={todo?.completed}>
                        <Edit />
                      </IconButton>
                      <IconButton size='small' color='error' onClick={() => onDelete(todo?.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
    </Box>
  );
};

export default TodoListPage;
