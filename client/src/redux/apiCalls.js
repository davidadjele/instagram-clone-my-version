import { 
  loginFailure, 
  loginStart, 
  loginSuccess,
  setUserToken,
  setUserDataStatus
} from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("auth/login", user);
        dispatch(loginSuccess(res.data));
        dispatch(setUserToken(res.data.accessToken));
        dispatch(setUserDataStatus(true));

    } catch (err) {
      dispatch(loginFailure());
    }
  };