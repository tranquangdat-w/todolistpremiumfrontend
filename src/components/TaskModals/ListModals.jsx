// import { Button } from '@mui/material'
// import { Chart } from 'react-google-charts'

// const ganttOptions = {
//   height: 350,
//   gantt: {
//     trackHeight: 40,
//   },
// }

// export default function WelcomeModal({ projects, selectedProject, onSelectProject, onClose }) {
//   const currentProject = projects.find(p => p.id === selectedProject)

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100vw',
//         height: '100vh',
//         background: 'rgba(0,0,0,0.3)',
//         zIndex: 9999,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}
//     >
//       <div style={{
//         background: '#f0f4ff',
//         padding: '2rem 2.5rem',
//         borderRadius: '12px',
//         textAlign: 'center',
//         boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
//         minWidth: 400
//       }}>
//         <div style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
//           Project Gantt Charts
//         </div>
//         <div style={{ marginBottom: '1rem', display: 'flex', gap: 12, justifyContent: 'center' }}>
//           {projects.map(p => (
//             <Button
//               key={p.id}
//               variant={selectedProject === p.id ? 'contained' : 'outlined'}
//               color="primary"
//               onClick={() => onSelectProject(p.id)}
//               style={{ minWidth: 120 }}
//             >
//               {p.name}
//             </Button>
//           ))}
//         </div>
//         <div style={{ background: '#fff', borderRadius: 8, padding: 12, marginBottom: 16 }}>
//           <Chart
//             chartType="Gantt"
//             width="600px"
//             height="350px"
//             data={currentProject.data}
//             options={ganttOptions}
//             loader={<div>Loading Chart...</div>}
//           />
//         </div>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={onClose}
//         >
//           Close
//         </Button>
//       </div>
//     </div>
//   )
// }
import { Card, CardContent, Typography, Button, IconButton, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { testAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'

const Home = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUserAPI())
  }

  const handleHello = () => {
    testAPI().then((res) => console.log(res))
  }

  const [lists, setLists] = useState([
    { id: 1, title: 'Cần làm', cards: [] },
    { id: 2, title: 'Đang làm', cards: [{ id: 1, title: 'Tiêu đề' }, { id: 2, title: 'Tiêu đề' }] },
    { id: 3, title: 'Đã xong', cards: [] },
  ]);

  return (
    <div className="px-8  bg-[#0079bf] min-h-screen rounded-[40px] relative">
      <h1 className="text-white text-2xl font-bold bg-blue-800 py-4 px-8 absolute top-0 left-0 right-0 w-full">Mock project</h1>
      <div className="flex gap-4 overflow-x-auto py-20">
        {lists.map((list) => (
          <div
            key={list.id}
            className="bg-gray-200 rounded-2xl h-fit w-64 flex-shrink-0 p-2"
          >
            <Typography variant="subtitle1" className="font-bold mb-2">{list.title}</Typography>
            {list.cards.map((card) => (
              <Card key={card.id} className="mt-2 !rounded-2xl">
                <CardContent className="flex items-center justify-between !p-2">
                  <div className="flex items-center gap-2">
                    <Checkbox size="small" />
                    <Typography>{card.title}</Typography>
                  </div>
                  <IconButton size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
            <Button
              size="small"
              fullWidth
              className="mt-1 normal-case text-black"
            >
              + Thêm thẻ
            </Button>
          </div>
        ))}

        <Button
          variant="contained"
          className="!bg-slate-200 hover:bg-blue-100 normal-case h-fit !text-[#0079bf] !rounded-xl flex-shrink-0"
        >
          + Thêm danh sách khác
        </Button>
      </div>
    </div>
  );
}

export default Home