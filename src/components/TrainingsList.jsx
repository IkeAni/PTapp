import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import { deleteTrainings, getTrainings } from "../CustomerApi";
import dayjs from "dayjs";

function TrainingsList() {
    // State variables for training data, snackbar visibility, and column definitions
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [colDefs, setColDefs] = useState([
        { field: "date", filter: true, valueFormatter: (params) => formatDate(params.value) },
        { field: "duration", filter: true, width: 120 },
        { field: "activity", filter: true, width: 140 },
        { field: "customer.firstname", filter: true },
        { field: "customer.lastname", filter: true },
        {
            // Delete button column
            cellRenderer: params => <Button size="small" color="error" onClick={() => handleDelete(params.data)}>Delete</Button>, width: 120
        },
    ]);

    // Fetch training data when component is mounted
    useEffect(() => {
        handleFetch();
    }, []);

    // Fetch training data from API
    const handleFetch = () => {
        getTrainings()
            .then(data => setTrainings(data))
            .catch(error => console.error(error));
    };

    // Close snackbar
    const handleClose = () => {
        setOpen(false);
    };

    // Delete a training session and refresh the data
    const handleDelete = (params) => {
        if (window.confirm("Are you sure?")) {
            setOpen(true);
            deleteTrainings(params.id)
                .then(() => handleFetch()) // Refresh the data after deletion
                .catch(error => console.error(error));
        }
    };

    // Format the date for display
    const formatDate = (dateString) => {
        return dayjs(dateString).format('DD.MM.YYYY HH:mm'); // Format as dd.mm.yyyy hh:mm
    };

    return (
        <>
            <div
                className="ag-theme-material" // applying the Data Grid theme
                style={{ height: 500 }} // the Data Grid will fill the size of the parent container
            >
                <AgGridReact
                    rowData={trainings}
                    columnDefs={colDefs}
                    pagination={true} // makes the list fit to page with pagination
                    paginationAutoPageSize={true} // automatically selects the size how many rows on a pagination page
                    suppressCellFocus={true} // deletes cell highlight when clicking any cell in agGrid
                />
                <Snackbar
                    open={open}
                    message="Training session deleted"
                    autoHideDuration={3000}
                    onClose={handleClose}
                />
            </div>
        </>
    );
}

export default TrainingsList;
