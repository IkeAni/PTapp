import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TrainingsList from './components/Trainingslist';
import CalendarPage from './components/CalendarPage';
import ActivityChart from './components/ActivityChart';

function App() {
  return (
    <Router basename = '/PTapp'>
      <Container maxWidth="xl">
        <AppBar position='static'>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              PT APP
            </Typography>
            <Button color="inherit" component={Link} to="/">Customers</Button>
            <Button color="inherit" component={Link} to="/trainings">Trainings</Button>
            <Button color="inherit" component={Link} to="/calendar">Calendar</Button>
            <Button color="inherit" component={Link} to="/trainingchart">Training Chart</Button>
          </Toolbar>
        </AppBar>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingsList />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path='/trainingchart' element={<ActivityChart />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;