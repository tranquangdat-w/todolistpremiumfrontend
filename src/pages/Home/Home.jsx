import { useEffect, useMemo, useState } from 'react'
import { Pagination } from '@mui/material'
import BoardPreviewCard from './components/BoardPreviewCard'
import { useDispatch, useSelector } from 'react-redux'
import { getBoardsByUserIdAPI } from '~/redux/board/boardSlice'

/* Dữ liệu mẫu */
const SAMPLE_BOARDS = Array.from({ length: 31 }).map((_, i) => ({
  id: `${i + 1}`,
  title: `Board ${i + 1}`,
  description: `Mô tả ngắn cho board Mô tả ngắn cho board Mô tả ngắn cho board Mô tả ngắn cho board ${i + 1}`,
  count: Math.floor(Math.random() * 20),
}))

export default function Home() {
  const [page, setPage] = useState(1)
  const pageSize = 8
  const dispatch = useDispatch()
  const board = useSelector((store) => store.board)

  const totalPages = 10

  const boardsOnPage = useMemo(() => {
        
    return board?.boards
  }, [page, board?.boards])

  useEffect(() => {
    dispatch(getBoardsByUserIdAPI({ page: page-1, size: pageSize }))
  }, [page])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-4xl font-semibold mb-3">Boards</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {boardsOnPage?.length > 0 && boardsOnPage.map((b) => (
            <BoardPreviewCard key={b.id} board={b} />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, v) => setPage(v)}
            color="primary"
          />
        </div>
      </div>
    </div>
  )
}
