import { useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { updateCustomer } from '../CustomerApi';

export default function EditCustomer(props) {
    // State to manage the customer data and dialog visibility
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    });

    const [open, setOpen] = useState(false);

    // Open dialog and load customer data for editing
    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: props.data.firstname,
            lastname: props.data.lastname,
            streetaddress: props.data.streetaddress,
            postcode: props.data.postcode,
            city: props.data.city,
            email: props.data.email,
            phone: props.data.phone
        });
    };

    // Close dialog without saving
    const handleClose = () => {
        setOpen(false);
    };

    // Save updated customer data
    const handleSave = () => {
        updateCustomer(props.data._links.customer.href, customer)
            .then(() => props.handleFetch()) // Fetch updated customer list
            .catch(err => console.error(err));
    };

    return (
        <>
            {/* Button to open the edit dialog */}
            <Button variant="outlined" onClick={handleClickOpen}>
                EDIT
            </Button>

            {/* Edit Customer Dialog */}
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
                        handleClose(); // Close dialog after form submission
                    },
                }}
            >
                <DialogTitle>Edit a Customer</DialogTitle>
                <DialogContent>
                    {/* Input fields for customer details */}
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

                {/* Dialog action buttons */}
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
