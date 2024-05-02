import { configureStore } from "@reduxjs/toolkit";
import typingReducer from './typingSlice';

export const store = configureStore({
    reducer : {
        typing : typingReducer,
    }

});