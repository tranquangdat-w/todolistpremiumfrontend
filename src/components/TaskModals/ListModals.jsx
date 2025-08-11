import { Button } from '@mui/material'
import { useState } from 'react'

export default function ListModals({ onClose }) {
  // Synthesis (fake) data for multiple projects
  const projects = [
    {
      id: 'project1',
      name: 'Website Redesign',
      tasks: [
        {
          id: 'T1',
          name: 'Requirement Gathering',
          percent: 100,
          due: '2025-08-03',
          overdue: false,
        },
        {
          id: 'T2',
          name: 'Wireframe Design',
          percent: 80,
          due: '2025-08-07',
          overdue: false,
        },
        {
          id: 'T3',
          name: 'UI Implementation',
          percent: 50,
          due: '2025-08-14',
          overdue: false,
        },
        {
          id: 'T4',
          name: 'Testing',
          percent: 0,
          due: '2025-08-18',
          overdue: true,
        },
        {
          id: 'T5',
          name: 'Deployment',
          percent: 0,
          due: '2025-08-20',
          overdue: false,
        },
      ]
    },
    {
      id: 'project2',
      name: 'Mobile App Launch',
      tasks: [
        {
          id: 'M1',
          name: 'Market Research',
          percent: 100,
          due: '2025-08-05',
          overdue: false,
        },
        {
          id: 'M2',
          name: 'App Development',
          percent: 60,
          due: '2025-08-15',
          overdue: false,
        },
        {
          id: 'M3',
          name: 'Beta Testing',
          percent: 20,
          due: '2025-08-18',
          overdue: true,
        },
        {
          id: 'M4',
          name: 'App Store Submission',
          percent: 0,
          due: '2025-08-20',
          overdue: false,
        },
      ]
    }
  ];

  // Flatten all tasks with project name
  const allTasks = projects.flatMap(project =>
    project.tasks.map(task => ({
      ...task,
      project: project.name
    }))
  );

  const inProcessTasks = allTasks.filter(t => !t.overdue && t.percent < 100);
  const overdueTasks = allTasks.filter(t => t.overdue);

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
        minWidth: 500,
        maxWidth: 700
      }}>
        <div style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
          Project Task Lists
        </div>

        {/* In Process Tasks Table */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>In Process Tasks</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#e3f2fd' }}>
                <th style={{ padding: 8, border: '1px solid #bbdefb' }}>Task Name</th>
                <th style={{ padding: 8, border: '1px solid #bbdefb' }}>Project</th>
                <th style={{ padding: 8, border: '1px solid #bbdefb' }}>Complete (%)</th>
                <th style={{ padding: 8, border: '1px solid #bbdefb' }}>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {inProcessTasks.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: 12, color: '#888' }}>No in process tasks</td>
                </tr>
              ) : (
                inProcessTasks.map(task => (
                  <tr key={task.id}>
                    <td style={{ padding: 8, border: '1px solid #e3f2fd' }}>{task.name}</td>
                    <td style={{ padding: 8, border: '1px solid #e3f2fd' }}>{task.project}</td>
                    <td style={{ padding: 8, border: '1px solid #e3f2fd' }}>{task.percent}%</td>
                    <td style={{ padding: 8, border: '1px solid #e3f2fd' }}>{task.due}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Overdue Tasks Table */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Overdue Tasks</div>
          {overdueTasks.length === 0 ? (
            <div style={{ color: '#43a047', fontWeight: 600, padding: 16, background: '#fff', borderRadius: 8 }}>
              🎉 Congratulations! No overdue tasks!
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: '#ffeaea' }}>
                  <th style={{ padding: 8, border: '1px solid #ffcdd2' }}>Task Name</th>
                  <th style={{ padding: 8, border: '1px solid #ffcdd2' }}>Project</th>
                  <th style={{ padding: 8, border: '1px solid #ffcdd2' }}>Complete (%)</th>
                  <th style={{ padding: 8, border: '1px solid #ffcdd2' }}>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {overdueTasks.map(task => (
                  <tr key={task.id}>
                    <td style={{ padding: 8, border: '1px solid #ffeaea' }}>{task.name}</td>
                    <td style={{ padding: 8, border: '1px solid #ffeaea' }}>{task.project}</td>
                    <td style={{ padding: 8, border: '1px solid #ffeaea' }}>{task.percent}%</td>
                    <td style={{ padding: 8, border: '1px solid #ffeaea' }}>{task.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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