import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import instructorReducer from '../features/instructor/instructorSlice';
import adminReducer from '../features/admin/adminSlice'
import corporateReducer from '../features/corporate/corporateSlice'
import traineeReducer from '../features/trainee/traineeSlice'
//import traineeReducer from '../features/trainee/traineeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    instructor: instructorReducer,
    admin: adminReducer,
    corporate:corporateReducer,
    trainee:traineeReducer,
  },
});
