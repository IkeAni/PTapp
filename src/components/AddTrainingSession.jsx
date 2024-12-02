import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { saveTraining } from '../CustomerApi';

export default function AddTrainingSession(props) {
    // State to manage dialog visibility
    const [open, setOpen] = useState(false);

    // State to manage training data
    const [training, setTraining] = useState({
        date: null,
        activity: "",
        duration: "",
        customer: ""
    });

    // Open dialog and reset training state
    const handleClickOpen = () => {
        setOpen(true);
        setTraining({ 
            date: null, 
            activity: "", 
            duration: "", 
            customer: props.data._links.self.href 
        });
    };

    // Close dialog
    const handleClose = () => {
        setOpen(false);
    };

    // Save training session and trigger parent's fetch
    const handleSave = () => {
        saveTraining(training)
            .then(() => {
                props.handleFetch();
                handleClose();
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            {/* Localization provider for date handling */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* Button to open the dialog */}
                <Button variant="outlined" onClick={handleClickOpen}>
                    ADD Training
                </Button>

                {/* Dialog for adding a new training session */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        Add a New Training Session for {props.data.firstname} {props.data.lastname}
                    </DialogTitle>
                    <DialogContent>
                        {/* Date picker for session date */}
                        <DateTimePicker
                            margin="dense"
                            name="date"
                            label="Date"
                            value={training.date}
                            onChange={date => setTraining({ ...training, date })}
                            fullWidth
                            variant="standard"
                        />
                        {/* Text field for activity */}
                        <TextField
                            margin="dense"
                            name="activity"
                            label="Activity"
                            value={training.activity}
                            onChange={event => setTraining({ ...training, activity: event.target.value })}
                            fullWidth
                            variant="standard"
                        />
                        {/* Text field for duration */}
                        <TextField
                            margin="dense"
                            name="duration"
                            label="Duration (mins)"
                            value={training.duration}
                            onChange={event => setTraining({ ...training, duration: event.target.value })}
                            fullWidth
                            variant="standard"
                        />
                        {/* Text field for customer (disabled by default, uncomment if editable) */}
                        {/*
                        <TextField
                            margin="dense"
                            name="customer"
                            label="Customer"
                            value={training.customer}
                            onChange={event => setTraining({ ...training, customer: event.target.value })}
                            fullWidth
                            variant="standard"
                            disabled // Disable when you want to prevent editing
                        />
                        */}
                    </DialogContent>
                    <DialogActions>
                        {/* Cancel button */}
                        <Button onClick={handleClose}>Cancel</Button>
                        {/* Save button */}
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            </LocalizationProvider>
        </>
    );
}
