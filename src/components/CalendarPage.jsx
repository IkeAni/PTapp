import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getTrainings } from "../CustomerApi";

const localizer = momentLocalizer(moment);

function CalendarPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch training sessions and map them to calendar events
        getTrainings()
            .then(data => {
                const formattedEvents = data.map(training => ({
                    title: training.activity,
                    start: new Date(training.date),
                    end: new Date(moment(training.date).add(training.duration, 'minutes').toISOString()),
                    customer: `${training.customer?.firstname || ''} ${training.customer?.lastname || ''}`.trim()
                }));
                setEvents(formattedEvents);
            })
            .catch(error => console.error(error));
    }, []);

    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: "#3174ad",
            color: "white",
            borderRadius: "5px",
            border: "none",
            padding: "5px"
        };
        return { style };
    };

    const eventTooltipAccessor = event => `${event.title} (${event.customer || 'No customer'})`;

    return (
        <div style={{ height: "80vh", margin: "20px" }}>
            <h2 style={{ textAlign: "center" }}>Training Calendar</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                views={['month', 'week', 'day']}
                defaultView="week"
                eventPropGetter={eventStyleGetter}
                tooltipAccessor={eventTooltipAccessor}
                popup
            />
        </div>
    );
}

export default CalendarPage;
