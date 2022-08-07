
//creamos el store para trabajar con redux

import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth';
import { journalSlice } from './journal';

export const store = configureStore({
  reducer: {
    //incluimos los slices en el store
    auth: authSlice.reducer,
    journal: journalSlice.reducer
  },
});
