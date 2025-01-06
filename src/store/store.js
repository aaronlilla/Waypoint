// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './navigation';

const store = configureStore({
  reducer: {
    navigation: navigationReducer,
  },
});

export default store;