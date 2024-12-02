import { useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { saveCustomer } from '../CustomerApi';

export default function AddCustomer(props) {
    // State to manage dialog open/close
    const [open, setOpen] = useState(false);

    // State to manage customer data
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    });

    // Open dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Close dialog
    const handleClose = () => {
        setOpen(false);
    };

    // Save customer and trigger parent's fetch
    const handleSave = () => {
        saveCustomer(customer)
            .then(() => {
                props.handleFetch();
                handleClose();
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            {/* Button to open the dialog */}
            <Button variant="outlined" onClick={handleClickOpen}>
                Add a new customer
            </Button>

            {/* Dialog to add a new customer */}
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>ADD A CUSTOMER</DialogTitle>

                {/* Form fields */}
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="firstname"
                        label="Firstname"
                        value={customer.firstname}
                        onChange={event => setCustomer({ ...customer, firstname: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        label="Lastname"
                        value={customer.lastname}
                        onChange={event => setCustomer({ ...customer, lastname: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        label="Streetaddress"
                        value={customer.streetaddress}
                        onChange={event => setCustomer({ ...customer, streetaddress: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        label="Postcode"
                        value={customer.postcode}
                        onChange={event => setCustomer({ ...customer, postcode: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        label="City"
                        value={customer.city}
                        onChange={event => setCustomer({ ...customer, city: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        value={customer.email}
                        onChange={event => setCustomer({ ...customer, email: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Phonenumber"
                        value={customer.phone}
                        onChange={event => setCustomer({ ...customer, phone: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>

                {/* Dialog actions */}
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};