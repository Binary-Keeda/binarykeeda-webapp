import { createSlice } from '@reduxjs/toolkit'

const solutionSlice = createSlice({
  name: 'solution',
  initialState: {
    solutions: null
  },
  reducers: {
    addSolutions: (state, action) => {
      state.solutions = action.payload
    }
  }
})

export const { addSolutions } = solutionSlice.actions
export default solutionSlice.reducer
