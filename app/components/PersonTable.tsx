import React, { useState, ReactNode } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Person as PersonInterface, convertDateOfBirthToString, Address } from '../lib/person';

interface PersonTableProps {
  people: PersonInterface[];
  handleOpen: (person: PersonInterface | null) => void;
  handleDelete: (id: number) => void;
  handleUpload: (personId: number) => void; // Add this line
}

interface File {
  url: string;
  filename: string;
}

const formatAddress = (address: Address | null): string => {
  if (!address) return 'No address';
  return `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`;
};

 const handleUpload = (personId: number) => {
  // Implement your logic to upload a file here
  console.log(`Upload for person ID: ${personId}`);
};

const PersonTable: React.FC<PersonTableProps> = ({ people, handleOpen, handleDelete, handleUpload }): ReactNode => {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<number | null>(null);
  const [files, setFiles] = useState<File[]>([]); // Add this line
  const openDeleteDialog = (id: number) => {
    setDeleteCandidate(id);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const confirmDelete = () => {
    if (deleteCandidate !== null) {
      handleDelete(deleteCandidate);
      closeDialog();
    }
  };

  return (
    <>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Files</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.firstname}</TableCell>
                <TableCell>{person.lastname}</TableCell>
                <TableCell>{person.phone}</TableCell>
                <TableCell>{convertDateOfBirthToString(person)}</TableCell>
                <TableCell>{formatAddress(person.address || null)}</TableCell>
                 <TableCell>{person.files?.map((file, index) => (
                    <div key={index}>
                      <a href={file.url} target="_blank" rel="noopener noreferrer">{file.filename}</a>
                    </div>
                  ))}
                 </TableCell>
                 <TableCell>
                  <Button onClick={() => handleOpen(person)}>Edit</Button>
                  <Button onClick={() => openDeleteDialog(person.id)}>Delete</Button>
                  <Button onClick={() => handleUpload(person.id)}>Upload File</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this record? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PersonTable;
