import React, { useState } from 'react';
import { Button, Switch } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const notifications = [
  {
    title: 'Complete the UI design of Landing Page for FoodVentures.',
    time: '2h',
    project: 'FoodVentures',
    projectColor: '#1976d2',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=64&h=64',
    highlight: ['UI design', 'FoodVentures'],
    user: {
      name: 'Alice',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    unread: true
  },
  {
    title: 'Complete the UI design of Landing Page for Travel Days.',
    time: '2h',
    project: 'Travel Days',
    projectColor: '#1976d2',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=64&h=64',
    highlight: ['UI design', 'Travel Days'],
    user: {
      name: 'Bob',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    unread: false
  },
  {
    title: 'Complete the Mobile app design for Pet Warden.',
    time: '2h',
    project: 'Pet Warden',
    projectColor: '#1976d2',
    img: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=64&h=64',
    highlight: ['Mobile app design', 'Pet Warden'],
    user: {
      name: 'Charlie',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    unread: false
  },
  {
    title: 'Complete the entire design for Juice Slider.',
    time: '2h',
    project: 'Juice Slider',
    projectColor: '#1976d2',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=64&h=64',
    highlight: ['entire design', 'Juice Slider'],
    user: {
      name: 'Diana',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    unread: false
  },
];

function highlightText(text, highlights) {
  if (!highlights) return text;
  let result = text;
  highlights.forEach(h => {
    result = result.replace(
      new RegExp(`(${h})`, 'gi'),
      '<b>$1</b>'
    );
  });
  return result;
}

const NotificationBox = ({ onClose }) => {
  const [onlyUnread, setOnlyUnread] = useState(true);
  const filtered = onlyUnread ? notifications.filter(n => n.unread) : notifications;

  return (
    <div
      style={{
        // position: 'fixed',
        // top: 30,
        // right: 30,
        background: '#e3f2fd',
        borderRadius: 20,
        boxShadow: '0 2px 24px rgba(0,0,0,0.10)',
        width: 420,
        maxWidth: '95vw',
        zIndex: 100,
        overflow: 'hidden',
        fontFamily: 'inherit',
        border: '1px solid #bbdefb'
      }}
    >
      <div style={{
        background: '#e3f2fd',
        color: '#1976d2',
        padding: '1.1rem 1.5rem 0.7rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #bbdefb'
      }}>
        <span style={{ fontWeight: 700, fontSize: 22 }}>Notifications</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 15, color: '#1976d2', marginRight: 4 }}>Only show unread</span>
          <Switch
            checked={onlyUnread}
            onChange={() => setOnlyUnread(v => !v)}
            color="primary"
            size="small"
          />
          <MoreVertIcon style={{ color: '#1976d2', cursor: 'pointer' }} />
        </div>
      </div>
      <div style={{
        borderBottom: '1px solid #bbdefb',
        padding: '0.7rem 1.5rem',
        fontWeight: 500,
        color: '#1976d2',
        background: '#f5faff'
      }}>
        Today
      </div>
      <div style={{
        minHeight: 260,
        maxHeight: 400,
        overflowY: 'auto',
        background: '#f5faff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: filtered.length === 0 ? 'center' : 'flex-start'
      }}>
        {filtered.length === 0 ? (
          <div style={{
            width: '100%',
            textAlign: 'center',
            marginTop: 40,
            marginBottom: 40
          }}>
            <img
              src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f43a.png"
              alt="No unread"
              style={{ width: 90, marginBottom: 18, opacity: 0.7 }}
            />
            <div style={{ fontSize: 22, color: '#1976d2', fontWeight: 600, marginBottom: 6 }}>
              No unread notifications
            </div>
          </div>
        ) : (
          filtered.map((n, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                background: '#fff',
                borderRadius: 16,
                margin: '18px 0 0 0',
                padding: '18px 18px 18px 18px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                width: '92%'
              }}
            >
              <img
                src={n.user.avatar}
                alt={n.user.name}
                title={n.user.name}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #bbdefb'
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: 16, marginBottom: 4, color: '#222' }}
                  dangerouslySetInnerHTML={{
                    __html: highlightText(n.title, n.highlight)
                  }}
                />
                <div style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>
                  {n.time} &nbsp;·&nbsp;
                  <span style={{ color: n.projectColor, fontWeight: 600 }}>
                    {n.project}
                  </span>
                </div>
              </div>
              <img
                src={n.img}
                alt="notification"
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 10,
                  objectFit: 'cover',
                  marginLeft: 4,
                  background: '#eee'
                }}
              />
            </div>
          ))
        )}
      </div>    
      <Button
        onClick={onClose}
        style={{
          width: '100%',
          borderRadius: 0,
          background: '#e3f2fd',
          color: '#1976d2',
          fontWeight: 600,
          fontSize: 16,
          padding: '14px 0',
          borderTop: '1px solid #bbdefb'
        }}
      >
        Close
      </Button>
    </div>
  );
};

export default NotificationBox;