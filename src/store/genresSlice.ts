import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchGenres } from '../api/tmdb'
import type { Genre } from '../types'

interface GenresState {
  items: Genre[]
  isLoading: boolean
  error: string | null
}

const initialState: GenresState = {
  items: [],
  isLoading: false,
  error: null,
}

export const loadGenres = createAsyncThunk(
  'genres/loadGenres',
  async () => {
    const data = await fetchGenres()
    return data.genres as Genre[]
  }
)

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadGenres.pending, state => {
        state.isLoading = true
      })
      .addCase(loadGenres.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(loadGenres.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? 'Failed to load genres'
      })
  },
})

export default genresSlice.reducer
