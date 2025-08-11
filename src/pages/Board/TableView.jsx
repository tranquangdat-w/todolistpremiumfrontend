import React from 'react';

export default function TableView() {
  // Fake data inside the component
  const todos = [
    { card: 'Capture from email, Slack, and Teams', list: 'Trello Starter Guide', dueDate: '' },
    { card: 'Work smarter', list: 'Trello Starter Guide', dueDate: '' },
    { card: 'Hello', list: 'Nothing', dueDate: 'Aug 12' },
  ];

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={thStyle}>Card</th>
          <th style={thStyle}>List</th>
          <th style={thStyle}>Due date</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={tdStyle}>{todo.card}</td>
            <td style={tdStyle}>{todo.list}</td>
            <td style={tdStyle}>
              {todo.dueDate ? (
                <span style={{ backgroundColor: '#fff3cd', padding: '2px 6px', borderRadius: '4px' }}>
                  {todo.dueDate}
                </span>
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle = {
  textAlign: 'left',
  padding: '8px',
  backgroundColor: '#f4f4f4'
};

const tdStyle = {
  padding: '8px'
};
