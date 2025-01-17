//'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Person, convertDateOfBirthToString } from '../lib/person';

interface PersonDialogProps {
  open: boolean;
  handleClose: () => void;
  currentPerson: Person | null;
  setCurrentPerson: React.Dispatch<React.SetStateAction<Person | null>>;
  handleSubmit: () => void;
}

const PersonDialog: React.FC<PersonDialogProps> = ({ open, handleClose, currentPerson, setCurrentPerson, handleSubmit }) => {
  const [initialCurrentPersonExist, setInitialCurrentPersonExist] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
      setInitialCurrentPersonExist(currentPerson !== null);
  }, [open]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
};

  const handleUpload = (event: React.MouseEventHandler<HTMLButtonElement>) => {
   if (selectedFile) {// Your upload logic here
    console.log(`Upload for person ${currentPerson?.id}`);
    console.log(selectedFile);
  }
  };


  const handleAddressChange = (field: keyof Person['address'], value: string) => {
    setCurrentPerson(prev => {
      if (prev) {
        return {
          ...prev,
          address: {
            ...prev.address,
            [field]: value || '', // If value is undefined, assign an empty string
          }
        };
      }
      return null;
    });
  };

  
  
  return (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{initialCurrentPersonExist ? 'Edit Person' : 'Add Person'}</DialogTitle>
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
    <TextField
      margin="dense"
      label="Street"
      fullWidth
      value={currentPerson?.address?.street || ''}
      onChange={e => handleAddressChange('street' as keyof Person['address'], e.target.value)}
    />
      <TextField
        margin="dense"
        label="City"
        fullWidth
        value={currentPerson?.address?.city || ''}
        onChange={e => handleAddressChange('city' as keyof Person['address'], e.target.value)}
      />
          <TextField
            margin="dense"
            label="State"
            fullWidth
            value={currentPerson?.address?.state || ''}
            onChange={e => handleAddressChange('state' as keyof Person['address'], e.target.value)}
          />
          <TextField
            margin="dense"
            label="Zip Code"
            fullWidth
            value={currentPerson?.address?.zipCode || ''}
            onChange={e => handleAddressChange('zipCode' as keyof Person['address'], e.target.value)}
          />
          <TextField
            margin="dense"
            label="Country"
            fullWidth
            value={currentPerson?.address?.country || ''}
            onChange={e => handleAddressChange('country' as keyof Person['address'], e.target.value)}
          />
          <TextField
            margin="dense"
            type="file"
            fullWidth
            onChange={handleFileSelect}
         />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSubmit} color="primary">
        {initialCurrentPersonExist ? 'Update' : 'Add'}
      </Button>
    </DialogActions>
  </Dialog>
)};

export default PersonDialog;
