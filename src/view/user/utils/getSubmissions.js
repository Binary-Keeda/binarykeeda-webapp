import axios from "axios";
import { BASE_URL } from "../../../lib/config";
import { addSolutions } from "../../../redux/reducers/SolutionReducer";
import store from "../../../redux/store";

export const getSubmissions = async () => {
    const {user} = store.getState().auth;
    
    try {
    //   setLoading(true)
      const res = await axios.get(
        `${BASE_URL}/api/v1/solution/get/solutions?userId=${user._id}`
      )
      store.dispatch(addSolutions(res.data))
    } catch (error) {
      console.log(error)
    } finally {
    //   setLoading(false)
    }
  }