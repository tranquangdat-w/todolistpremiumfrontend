import { Button } from '@mui/material'
import { Chart } from 'react-google-charts'
import { useState } from 'react'

export default function GraphModals({ onClose }) {
  // Gantt chart options
  const ganttOptions = {
    height: 350,
    gantt: {
      trackHeight: 40,
    },
  };

  // Synthesis (fake) data for multiple projects
  const projects = [
    {
      id: 'project1',
      name: 'Website Redesign',
      data: [
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
          'T1', 'Requirement Gathering', 'Alice', new Date(2025, 7, 1), new Date(2025, 7, 3), null, 100, null,
        ],
        [
          'T2', 'Wireframe Design', 'Bob', new Date(2025, 7, 4), new Date(2025, 7, 7), null, 80, 'T1',
        ],
        [
          'T3', 'UI Implementation', 'Charlie', new Date(2025, 7, 8), new Date(2025, 7, 14), null, 50, 'T2',
        ],
        [
          'T4', 'Testing', 'Diana', new Date(2025, 7, 15), new Date(2025, 7, 18), null, 0, 'T3',
        ],
        [
          'T5', 'Deployment', 'Alice', new Date(2025, 7, 19), new Date(2025, 7, 20), null, 0, 'T4',
        ],
      ]
    },
    {
      id: 'project2',
      name: 'Mobile App Launch',
      data: [
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
          'M1', 'Market Research', 'Eve', new Date(2025, 7, 2), new Date(2025, 7, 5), null, 100, null,
        ],
        [
          'M2', 'App Development', 'Frank', new Date(2025, 7, 6), new Date(2025, 7, 15), null, 60, 'M1',
        ],
        [
          'M3', 'Beta Testing', 'Grace', new Date(2025, 7, 16), new Date(2025, 7, 18), null, 20, 'M2',
        ],
        [
          'M4', 'App Store Submission', 'Heidi', new Date(2025, 7, 19), new Date(2025, 7, 20), null, 0, 'M3',
        ],
      ]
    }
  ];

  const [selectedProject, setSelectedProject] = useState(projects[0].id);
  const currentProject = projects.find(p => p.id === selectedProject);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.3)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{
        background: '#f0f4ff',
        padding: '2rem 2.5rem',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
        minWidth: 400
      }}>
        <div style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
          Project Gantt Chart
        </div>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: 12, justifyContent: 'center' }}>
          {projects.map(p => (
            <Button
              key={p.id}
              variant={selectedProject === p.id ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setSelectedProject(p.id)}
              style={{ minWidth: 120 }}
            >
              {p.name}
            </Button>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 8, padding: 12, marginBottom: 16 }}>
          <Chart
            chartType="Gantt"
            width="600px"
            height="350px"
            data={currentProject.data}
            options={ganttOptions}
            loader={<div>Loading Chart...</div>}
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  )
}