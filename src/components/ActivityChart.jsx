import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { getTrainings } from '../CustomerApi';
import { groupBy, map, sumBy } from 'lodash';

function ActivityChart() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getTrainings()
            .then(data => {
                const formedData = transformData(data); 
                setChartData(formedData); 
            })
            .catch(error => console.error("Error fetching training data:", error));
    };

    /**
     * Transforms the raw training sessions data into a format suitable for the chart.
     * Groups sessions by activity and calculates the total duration for each activity.
     *
     * @param {Array} sessions - The raw training sessions data
     * @returns {Array} - Transformed data for the chart
     */
    const transformData = (sessions) => {
        const grouped = groupBy(sessions, session => session.activity.toLowerCase());
        
        return map(grouped, (sessions, activity) => ({
            activity,
            totalDuration: sumBy(sessions, 'duration'),
        }));
    };

    return (
        <div
            className="ag-theme-material" 
            style={{ width: "97vw", height: "88vh" }} 
        >
            <ResponsiveContainer>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalDuration" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ActivityChart;

