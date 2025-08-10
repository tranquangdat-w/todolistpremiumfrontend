import { Button } from '@mui/material'
import { Chart } from 'react-google-charts'

const ganttOptions = {
  height: 350,
  gantt: {
    trackHeight: 40,
  },
}

export default function WelcomeModal({ projects, selectedProject, onSelectProject, onClose }) {
  const currentProject = projects.find(p => p.id === selectedProject)

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
          Project Gantt Charts
        </div>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: 12, justifyContent: 'center' }}>
          {projects.map(p => (
            <Button
              key={p.id}
              variant={selectedProject === p.id ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => onSelectProject(p.id)}
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
