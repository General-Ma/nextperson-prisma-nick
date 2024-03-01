//'use client'

import React from 'react';
import { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Person, convertDateOfBirthToString } from '../lib/person';

interface PersonDialogProps {
  open: boolean;
  handleClose: () => void;
  currentPerson: Person | null;
  setCurrentPerson: React.Dispatch<React.SetStateAction<Person | null>>;
  handleSubmit: () => void;
}

const PersonDialog: React.FC<PersonDialogProps> = ({ open, handleClose, currentPerson, setCurrentPerson, handleSubmit }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{currentPerson ? 'Edit Person' : 'Add Person'}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="First Name"
        fullWidth
        value={currentPerson?.firstname || ''}
        onChange={e => setCurrentPerson(prev => ({ ...prev!, firstname: e.target.value }))}
      />
      <TextField
        margin="dense"
        label="Last Name"
        fullWidth
        value={currentPerson?.lastname || ''}
        onChange={e => setCurrentPerson(prev => ({ ...prev!, lastname: e.target.value }))}
      />
      <TextField
        margin="dense"
        label="Phone"
        fullWidth
        value={currentPerson?.phone || ''}
        onChange={e => setCurrentPerson(prev => ({ ...prev!, phone: e.target.value }))}
      />
      <TextField
        margin="dense"
        label="Date of Birth"
        type="date"
        fullWidth
        value={currentPerson?.dateOfBirth ? convertDateOfBirthToString(currentPerson): '2001-01-01'}
        onChange={(e) => {
          setCurrentPerson(prev => ({...prev!,dateOfBirth: new Date(e.target.value)}))
        }
      }
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSubmit} color="primary">
        {currentPerson ? 'Update' : 'Add'}
      </Button>
    </DialogActions>
  </Dialog>
);

export default PersonDialog;
