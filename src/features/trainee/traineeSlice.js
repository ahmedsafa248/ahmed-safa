import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import traineeService from './traineeService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    OwnCourses: [],
    cid: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }


  export const ViewEnrolledCourses = createAsyncThunk(
    'auth/viewenrolledcourses',
    async (query, thunkAPI) => {
      try {
        return await traineeService.ViewEnrolledCourses(query)
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

  export const rateCourse = createAsyncThunk(
    'auth/ratecourse',
    async (query, thunkAPI) => {
      try {
        return await traineeService.rateCourse(query)
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

  export const rateInstructor = createAsyncThunk(
    'auth/rateinstructor',
    async (query, thunkAPI) => {
      try {
        return await traineeService.rateInstructor(query)
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

  export const reportProblem = createAsyncThunk(
    'auth/reportproblem',
    async (query, thunkAPI) => {
      try {
        return await traineeService.reportProblem(query)
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

  export const getcoursebyid=createAsyncThunk(
    'auth/getcbid',
    async (query, thunkAPI) => {
      try {
        return await  traineeService.getcoursebyid(query)
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

  
  export const traineeSlice =createSlice({
    name:'trainee',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers: (builder) => {
      builder
        .addCase(ViewEnrolledCourses.pending, (state) => {
          state.isLoading = true
        })
        .addCase(ViewEnrolledCourses.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.OwnCourses = action.payload
        })
        .addCase(ViewEnrolledCourses.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
        .addCase(rateCourse.pending, (state) => {
          state.isLoading = true
        })
        .addCase(rateCourse.fulfilled, (state) => {
          state.isLoading = false
          state.isSuccess = true
          
        })
        .addCase(rateInstructor.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })

        .addCase(rateInstructor.pending, (state) => {
          state.isLoading = true
        })
        .addCase(rateInstructor.fulfilled, (state) => {
          state.isLoading = false
          state.isSuccess = true
          
        })
        .addCase(rateCourse.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })

        .addCase(reportProblem.pending, (state) => {
          state.isLoading = true
        })
        .addCase(reportProblem.fulfilled, (state) => {
          state.isLoading = false
          state.isSuccess = true
          
        })
        .addCase(reportProblem.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
        .addCase(getcoursebyid.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getcoursebyid.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.cid=action.payload
          
        })
        .addCase(getcoursebyid.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
        
      },
  
  })
  
  

  export const {reset}=traineeSlice.actions
  export default traineeSlice.reducer