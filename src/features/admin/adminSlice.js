import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminService from './adminService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,

    isError: false,
    isSuccess: false,
    isLoading: false,
    OwnCourses: [],
    message: '',
  }

  export const addInstructor = createAsyncThunk(
    'auth/addinstructor',
    async (query, thunkAPI) => {
      try {
        return await adminService.addInstructor(query)
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

  export const addAdmin = createAsyncThunk(
    'auth/addadmin',
    async (query, thunkAPI) => {
      try {
        return await adminService.addAdmin(query)
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

  export const addCorporate = createAsyncThunk(
    'auth/addcorporate',
    async (query, thunkAPI) => {
      try {
        return await adminService.addCorporate(query)
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

  export const allowAccess = createAsyncThunk(
    'auth/allowaccess',
    async (query, thunkAPI) => {
      try {
        return await adminService.allowAccess(query)
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

  export const showRequests = createAsyncThunk(
    'auth/showrequests',
    async (query, thunkAPI) => {
      try {
        console.log(query)
        return await adminService.showRequests(query)
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



  
  export const adminSlice =createSlice({
    name:'admin',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers: (builder) => {
      builder
        .addCase(addInstructor.pending, (state) => {
          state.isLoading = true
        })
        .addCase(addInstructor.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
         // state.OwnCourses = action.payload
        })
        .addCase(addInstructor.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })

        .addCase(addAdmin.pending, (state) => {
            state.isLoading = true
          })
          .addCase(addAdmin.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
           state.OwnCourses = action.payload
          })
          .addCase(addAdmin.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
          })

          .addCase(addCorporate.pending, (state) => {
            state.isLoading = true
          })
          .addCase(addCorporate.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.OwnCourses = action.payload
          })
          .addCase(addCorporate.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
          })

          .addCase(showRequests.pending, (state) => {
            state.isLoading = true
          })
          .addCase(showRequests.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.OwnCourses = action.payload
          })
          .addCase(showRequests.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
          })

          .addCase(allowAccess.pending, (state) => {
            state.isLoading = true
          })
          .addCase(allowAccess.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
           // state.OwnCourses = action.payload
          })
          .addCase(allowAccess.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
          })

        
      },
  
  })

  

  export const {reset}=adminSlice.actions
  export default adminSlice.reducer