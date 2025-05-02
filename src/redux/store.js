import { configureStore } from "@reduxjs/toolkit";
import useReducer from './slice/UserSlice';
import solutionReducer from './reducers/SolutionReducer';
import pathReducer from './reducers/pathReducer';
import quizReducer from './reducers/quizReducer';
import testReduer from './reducers/testReducer';
const store = configureStore({
    reducer:{
        'auth':useReducer,
        'solution':solutionReducer,
        'path':pathReducer,
        'quiz':quizReducer,
        'test':testReduer
    }
})

export default store;