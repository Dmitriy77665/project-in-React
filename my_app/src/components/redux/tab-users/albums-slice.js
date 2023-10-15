import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAlbums = createAsyncThunk(
  'album/fetchAlbums',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/albums`
      )
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const albumSlice = createSlice({
    name: 'album',
    initialState: {
    albums: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.loading = false
        state.albums = action.payload
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default albumSlice.reducer

