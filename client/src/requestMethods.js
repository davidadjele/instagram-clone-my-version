import axios from "axios";
import { setOtherUser, setOtherUserPosts } from "./redux/otherUserRedux";
import { setCurrentUserPost } from "./redux/userRedux";

const BASE_URL = "https://connectplace.herokuapp.com/api/";
const BASE_URL_DEV = "http://localhost:5000/api/";

/* const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser; */

/* Change for BASE_URL in prod and BASE_URL_DEV for dev */
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const API_URL = BASE_URL;

/* Change for BASE_URL xin prod and BASE_URL_DEV for dev */
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const FREE_AVATAR = 'https://register.pravasikerala.org/public/images/avatar5.png';


export const fetchUsers = async (dispatch,userInfo,token,fonction) => {

  try {
      const res = await axiosInstance.get(
          `users/finduserbyusername/${userInfo.username}`,
          {
          headers:  { 
              token: `Bearer ${token}`,
          }
      });
      dispatch( fonction(res.data) );
      
  } catch (error) {
      console.log(error);
  }
}

export const getUserPosts= async (dispatch,setPosts,userInfo,token) => {
  try {
    const res = await axiosInstance.get(
      `posts/findallimages/${userInfo._id}`,
      {
        headers:  { 
          token: `Bearer ${token}`,
        }
      });
      setPosts(res.data)
      dispatch(setCurrentUserPost(res.data))
  } catch (error) {
    console.log(error);
  }
}

export const getOtherUserPosts= async (dispatch,userInfo,token) => {
  try {
    const res = await axiosInstance.get(
      `posts/findallimages/${userInfo._id}`,
      {
        headers:  { 
          token: `Bearer ${token}`,
        }
      });
      dispatch(setOtherUserPosts(res.data))
  } catch (error) {
    console.log(error);
  }
}

export const getNewUsers = async (setSuggestionUser,user,token) => {
  try {
    const res = await axiosInstance.get(`users/?new=true`,
      {
        headers:  { 
          token: `Bearer ${token}`,
        }
      });
      setSuggestionUser(res
        .data
        .filter(e => !e.numberOfFollowers.some(item => item=== user._id) && e._id !== user._id)
      );
  } catch (error) {
    console.log(error);
  }
}

export const getOtherUserInfos = async (dispatch,user,token) => {
  try {
      dispatch( setOtherUser(user) );
      const res = await axiosInstance.get(
          `posts/findallimages/${user._id}`,
          {
          headers:  { 
              token: `Bearer ${token}`,
          }
          });
          dispatch( setOtherUserPosts(res.data) );
          //window.location.reload();
  } catch (error) {
      console.log(error);
  }
}