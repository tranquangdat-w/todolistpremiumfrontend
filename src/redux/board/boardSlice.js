import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'

const initialState = {
    board: null,
    boards: [],
}

export const createBoardAPI = createAsyncThunk(
    'boards/createBoardAPI',
    async ({ data }) => {
        const response = await authorizedAxiosInstance.post('/boards', data)

        console.log(response.data);

        return response.data
    }
)

export const getBoardDetailAPI = createAsyncThunk(
    'boards/getBoardDetailAPI',
    async ({ boardId }) => {
        const response = await authorizedAxiosInstance.get(`/boards/${boardId}`)

        return response.data
    }
)

export const updateBoardAPI = createAsyncThunk(
    'boards/updateBoardAPI',
    async ({ data, boardId }) => {
        const response = await authorizedAxiosInstance.put(`/boards/${boardId}`, data)

        return response.data
    }
)

export const deleteBoardAPI = createAsyncThunk(
    'boards/deleteBoardAPI',
    async ({ boardId }) => {
        const response = await authorizedAxiosInstance.delete(`/boards/${boardId}`)

        return response.data
    }
)

export const getBoardsByUserIdAPI = createAsyncThunk(
    'boards/getBoardsByUserIdAPI',
    async ({ page, size }) => {
        const response = await authorizedAxiosInstance.get(`/boards?page=${page}&size=${size}`)
        console.log(response.data);

        return response.data
    }
)


// Khoi tao slice trong kho luu tru redux
export const boardSlice = createSlice({
    name: 'board',
    initialState,

    // ExtraReducers: Xu li du lieu bat dong bo api
    extraReducers: (builder) => {
        builder.addCase(createBoardAPI.fulfilled, (state, action) => {
            const newBoard = action.meta.arg.data
            console.log(state.boards);

            state.boards = [...state.boards, newBoard]
        })
        builder.addCase(getBoardDetailAPI.fulfilled, (state, action) => {
            state.board = action.payload
        })
        builder.addCase(updateBoardAPI.fulfilled, (state, action) => {
            const updatedBoard = action.meta.arg.data
            const updatedBoardId = action.meta.arg.boardId
            state.boards = state.boards.map(b => b.id === updatedBoardId ? updatedBoard : b)
            
        })
        builder.addCase(deleteBoardAPI.fulfilled, (state, action) => {
            const deletedBoardId = action.meta.arg.boardId
            state.boards = state.boards.filter(b => b.id !== deletedBoardId)
        })
        
        // builder.addCase(updateBoardAPI.fulfilled, (state, action) => {
        //     state.boards = [...state.boards.filter(b => b.id !== action.payload.id), action.payload]
        // })
        builder.addCase(getBoardsByUserIdAPI.fulfilled, (state, action) => {
            state.boards = [...action.payload.content]
        })
    }

})

export const boardReducer = boardSlice.reducer

