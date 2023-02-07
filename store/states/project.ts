import { Project } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProjectState {
  activeProject: Project | null; 
}

const initialState: ProjectState = { activeProject: null };

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setActiveProject: (state, action: PayloadAction<Project>) => {
      state.activeProject = action.payload;
    }
  }
});

export const { setActiveProject } = projectSlice.actions;
export const selectActiveProject = (state: RootState) => state.project.activeProject;
export default projectSlice.reducer;