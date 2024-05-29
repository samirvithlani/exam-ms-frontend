import { Box } from '@mui/material';
import React from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';

export const PieComponent = ({ chartType }) => {
    const data = {
        labels: ['Group A', 'Group B', 'Group C', 'Group D'],
        datasets: [
            {
                label: 'Data',
                data: [400, 300, 300, 200],
                backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
            },
        ],
    };

    const options = {
        responsive: true,
        
        //maintainAspectRatio: false, // Let CSS handle aspect ratio
    };

    switch (chartType) {
        case 'pie':
            return <Box sx={{width:"100%",minWidth:"220px",height:"auto"}}> <Pie data={data} options={options} /></Box>;
        case 'line':
            return <Line data={data} options={options} />;
        case 'bar':
            return <Box sx={{width:"100%",minWidth:"220px",height:"auto"}}> <Bar data={data} options={options} /></Box>;
        default:
            return null; // Render nothing if an invalid chart type is provided
    }
};
