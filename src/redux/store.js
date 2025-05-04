import { configureStore } from "@reduxjs/toolkit";
import useReducer from './slice/UserSlice';
import solutionReducer from './reducers/SolutionReducer';
import pathReducer from './reducers/pathReducer';
import quizReducer from './reducers/quizReducer';
import testReduer from './reducers/testReducer';
import testUserReducer from './reducers/testReducerUser';
const store = configureStore({
    reducer:{
        'auth':useReducer,
        'solution':solutionReducer,
        'path':pathReducer,
        'quiz':quizReducer,
        'test':testReduer,
        'testUser':testUserReducer
    }
})

export default store;