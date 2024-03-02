//'use client'

import React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { Person, convertDateOfBirthToString } from '../lib/person';

interface PersonTableProps {
  people: Person[];
  handleOpen: (person: Person | null) => void;
  handleDelete: (id: number) => void;
}

const PersonTable: React.FC<PersonTableProps> = ({ people, handleOpen, handleDelete }) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>First and Middle Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Date of Birth</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {people.map(person => (
          <TableRow key={person.id}>
            <TableCell>{person.firstname}</TableCell>
            <TableCell>{person.lastname}</TableCell>
            <TableCell>{person.phone}</TableCell>
            <TableCell>{convertDateOfBirthToString(person)}</TableCell>
            <TableCell>
              <Button onClick={() => handleOpen(person)}>Edit</Button>
              <Button onClick={() => handleDelete(person.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default PersonTable;
