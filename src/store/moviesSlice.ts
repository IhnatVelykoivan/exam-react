import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchMovies, searchMovies } from '../api/tmdb'
import type { Movie } from '../types'

interface MoviesState {
  items: Movie[]
  currentPage: number
  totalPages: number
  selectedGenreId: number | null
  searchQuery: string
  isLoading: boolean
  error: string | null
}

const initialState: MoviesState = {
  items: [],
  currentPage: 1,
  totalPages: 1,
  selectedGenreId: null,
  searchQuery: '',
  isLoading: false,
  error: null,
}

export const loadMovies = createAsyncThunk(
  'movies/loadMovies',
  async (_, { getState }) => {
    const state = getState() as { movies: MoviesState }
    const { currentPage, selectedGenreId, searchQuery } = state.movies
    if (searchQuery) {
      return searchMovies(searchQuery, currentPage)
    }
    return fetchMovies(currentPage, selectedGenreId ?? undefined)
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setGenre: (state, action: PayloadAction<number | null>) => {
      state.selectedGenreId = action.payload
      state.searchQuery = ''
      state.currentPage = 1
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.selectedGenreId = null
      state.currentPage = 1
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadMovies.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loadMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.results
        state.totalPages = action.payload.total_pages
      })
      .addCase(loadMovies.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? 'Failed to load movies'
      })
  },
})

export const { setPage, setGenre, setSearchQuery } = moviesSlice.actions
export default moviesSlice.reducer
