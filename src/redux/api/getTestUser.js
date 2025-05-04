import axios from "axios";
import { incrementPage, setCurrentPage, setHasMore, setTotalPage, testFailure, testRequest, testSuccess } from "../reducers/testReducerUser";
import store from "../store";
import { BASE_URL } from "../../lib/config";

export const getTestUser = async () => {
    const { data, page , category} = store.getState().testUser;
    const {user} = store.getState().auth;
    store.dispatch(testRequest());
    try {

        const res = await axios.get(`${BASE_URL}/api/v2/test/user/${user._id}?page=${page}&limit=${10}`  ,{withCredentials:true});

        store.dispatch(incrementPage());
        store.dispatch(setTotalPage(res.data.pagination.totalPages));
        store.dispatch(setCurrentPage(res.data.pagination.page));
        const quizData = await {
            key: res.data.pagination.page,
            value: res.data.data
        }

        store.dispatch(testSuccess(quizData));
        if (res.data.pagination.totalPages <= page) {
            store.dispatch(setHasMore());
        }

    } catch (error) {
        store.dispatch(testFailure(error.message));
        console.log(error)
    }
}