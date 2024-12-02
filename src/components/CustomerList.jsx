import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import { getCustomers, deleteCustomer } from "../CustomerApi";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";
import AddTrainingSession from "./AddTrainingSession";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [colDefs, setColDefs] = useState([
        { field: "firstname", filter: true, width: 120 },
        { field: "lastname", filter: true, width: 120 },
        { field: "streetaddress", filter: true, width: 140 },
        { field: "postcode", filter: true, width: 100 },
        { field: "city", filter: true, width: 120 },
        { field: "email", filter: true },
        { field: "phone", filter: true, width: 140 },
        {
            cellRenderer: params => <Button size="small" color="error" onClick={() => handleDelete(params.data)}>Delete</Button>, width: 120
        },
        {
            cellRenderer: params => <EditCustomer data={params.data} handleFetch={handleFetch}></EditCustomer>, width: 120
        },
        {
            cellRenderer: params => <AddTrainingSession data={params.data} handleFetch={handleFetch}></AddTrainingSession>
        }
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.error(error));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (params) => {
        if (window.confirm("Are you sure?")) {
            setOpen(true);
            deleteCustomer(params._links.self.href)
                .then(() => handleFetch())
                .catch(error => console.error(error));
        }
    };

    const exportToCSV = () => {
        const headers = ["Firstname", "Lastname", "Street Address", "Postcode", "City", "Email", "Phone"];
        const rows = customers.map(customer => [
            customer.firstname,
            customer.lastname,
            customer.streetaddress,
            customer.postcode,
            customer.city,
            customer.email,
            customer.phone,
        ]);

        const csvContent = [
            headers.join(","), // the header row
            ...rows.map(row => row.join(",")) // each data row
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "customers.csv";
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div style={{ marginBottom: "10px" }}>
                <AddCustomer handleFetch={handleFetch}></AddCustomer>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={exportToCSV} 
                    style={{ marginLeft: "10px" }}>
                    Export to CSV
                </Button>
            </div>
            <div
                className="ag-theme-material"
                style={{ height: 500 }}
            >
                <AgGridReact
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
                <Snackbar
                    open={open}
                    message="Customer deleted"
                    autoHideDuration={3000}
                    onClose={handleClose}
                />
            </div>
        </>
    );
}

export default CustomerList;

