import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from "./states/project";

const store = configureStore({
  reducer: {
    project: ProjectReducer
  } 
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch