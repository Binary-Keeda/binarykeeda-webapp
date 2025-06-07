import axios from 'axios';
import { BASE_URL } from '../../lib/config';
import { setRankData, setError, setLoading } from '../slice/UserSlice';

export const getRank = (id, college) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    console.log("fet")
    const response = await axios.get(
      `${BASE_URL}/user/profile/rank?userId=${id}&university=${college}`
    );
    console.log(response.data)
    dispatch(setRankData(response.data));
  } catch (error) {
    console.error(error);
    dispatch(setError(error.message || 'Failed to fetch rank data'));
  } finally {
    dispatch(setLoading(false));
  }
};
