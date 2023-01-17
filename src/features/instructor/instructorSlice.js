import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instructorService from './instructorService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    OwnCourses: [],
    AddedCourse:null,
    OtherCourses: [],
    CreatedCourse:null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }

  export const instructorSOCTSI = createAsyncThunk(
    'auth/isoctsi',
    async (query, thunkAPI) => {
      try {
        return await instructorService.instructorSOCTSI(query)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

  export const AddCourse = createAsyncThunk(
    'auth/addCourse',
    async (query, thunkAPI) => {
      try {
        //console.log(query)
        return await instructorService.AddCourse(query)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

  export const instructorSlice =createSlice({
    name:'instructor',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers: (builder) => {
      builder
        .addCase(instructorSOCTSI.pending, (state) => {
          state.isLoading = true
        })
        .addCase(instructorSOCTSI.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.OwnCourses = action.payload
        })
        .addCase(instructorSOCTSI.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
        .addCase(AddCourse.pending, (state) => {
          state.isLoading = true
        })
        .addCase(AddCourse.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.AddedCourse = action.payload
        })
        .addCase(AddCourse.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
      },
  
  })

  

  export const {reset}=instructorSlice.actions
  export default instructorSlice.reducer