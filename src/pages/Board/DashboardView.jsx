import { useState } from 'react';

import { Grid, Paper, Typography } from '@mui/material';
import { Chart } from 'react-google-charts';
import SummaryCard from './SummaryCard'; // Assuming you have a SummaryCard component;
export default function Dashboard() {
  const completedTasksData = [
    ["List", "Cards"],
    ["Trello Starter", 4],
    ["Today", 3],
    ["This Week", 0],
    ["Later", 0],
    ["Nothing", 3]
  ];

  const completedTasksOptions = {
    title: "Cards per list",
    legend: { position: "none" },
    chartArea: { width: "80%", height: "70%" },
    colors: ["#3e4a64"], // match dark blue in your screenshot
    vAxis: { minValue: 0, format: "0" }
  };

  const overdueData = [
    ["Status", "Tasks"],
    ["Ongoing", 12],
    ["Incoming Due", 5],
    ["Future Tasks", 10],
    ["Overdue", 3]
  ];

  const overdueOptions = {
    title: "Task Status Distribution",
    pieHole: 0.4, // donut style
    chartArea: { width: "90%", height: "80%" },
    legend: { position: "right" },
    colors: ["#4caf50", "#ff9800", "#03a9f4", "#f44336"], // green, orange, blue, red
  };
  

  const ganttData = [
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "string", label: "Resource" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ],
    ["Task1", "Prototype", "Engineering",
      new Date(2025, 0, 1), new Date(2025, 0, 5), null, 50, null],
    ["Task2", "Development", "Engineering",
      new Date(2025, 0, 6), new Date(2025, 0, 20), null, 20, "Task1"],
  ];

  const ganttOptions = {
    height: 350,
    gantt: {
      trackHeight: 30,
    },
  };

  const BoxItem = ({ title, value }) => (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        textAlign: 'center',
        borderRadius: 2,
        backgroundColor: '#f5f5f5',
        height: '100%'
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4" fontWeight="bold">
        {value}
      </Typography>
    </Paper>
  );

  const contributors = [
  {
    id: 'alice',
    name: 'Alice',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    tasks: [
      [
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'string', label: 'Resource' },
        { type: 'date', label: 'Start Date' },
        { type: 'date', label: 'End Date' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },
      ],
      [
        'A1', 'Design', null, new Date(2025, 7, 1), new Date(2025, 7, 5), null, 100, null,
      ],
      [
        'A2', 'Development', null, new Date(2025, 7, 6), new Date(2025, 7, 10), null, 60, 'A1',
      ],
    ]
  },
  {
    id: 'bob',
    name: 'Bob',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    tasks: [
      [
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'string', label: 'Resource' },
        { type: 'date', label: 'Start Date' },
        { type: 'date', label: 'End Date' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },
      ],
      [
        'B1', 'Testing', null, new Date(2025, 7, 11), new Date(2025, 7, 13), null, 20, null,
      ],
      [
        'B2', 'Deployment', null, new Date(2025, 7, 14), new Date(2025, 7, 16), null, 0, 'B1',
      ],
    ]
  },
  {
    id: 'charlie',
    name: 'Charlie',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    tasks: [
      [
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'string', label: 'Resource' },
        { type: 'date', label: 'Start Date' },
        { type: 'date', label: 'End Date' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },
      ],
      [
        'C1', 'Research', null, new Date(2025, 7, 3), new Date(2025, 7, 7), null, 80, null,
      ],
      [
        'C2', 'Prototype', null, new Date(2025, 7, 8), new Date(2025, 7, 14), null, 30, 'C1',
      ],
    ]
  }
];
  const [selectedContributor, setSelectedContributor] = useState(contributors[0].id);

  const currentContributor = contributors.find(c => c.id === selectedContributor);

  return (
    <Grid container spacing={2} padding={3}>
      <Grid item xs={9}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            borderRadius: 2,
            backgroundColor: '#ffffff',
            height: '100%',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Project Timeline
          </Typography>
          <Chart
            chartType="Gantt"
            width="100%"
            height="100%"
            data={ganttData}
            options={ganttOptions}
            loader={<div>Loading Chart...</div>}
          />
        </Paper>
      </Grid>
      <Grid item xs={3} container>
        <Grid item xs={12}>
          <SummaryCard />
        </Grid>
      </Grid>

      <Grid item xs={4.5}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: '#ffffff',
            height: '100%'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Tasks Per Column
          </Typography>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="200px"
            data={completedTasksData}
            options={completedTasksOptions}
          />
        </Paper>
      </Grid>
      <Grid item xs={4.5}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: '#ffffff',
            height: '100%'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Tasks Per User
          </Typography>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="200px"
            data={completedTasksData}
            options={completedTasksOptions}
          />
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: '#ffffff',
            height: '100%'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Task Status
          </Typography>
          <Chart
            chartType="PieChart"
            width="100%"
            height="200px"
            data={overdueData}
            options={overdueOptions}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
