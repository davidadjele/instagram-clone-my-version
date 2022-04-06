import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SettingProfilePage from "./Pages/SettingProfilePage";

import CreatePostPage from "./Pages/CreatePostPage";
import MessagePage from "./Pages/MessagePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import OtherProfilePage from "./Pages/OtherProfilePage";
import { loginSuccess } from "./redux/userRedux";
import { axiosInstance } from "./requestMethods";

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser);
  const token =  useSelector((state) => state.user.currentUserToken);
  const [posts,setPosts] = useState([]);

  useEffect(() => {
    if(user){
      const interval = setInterval(() => {
        const fetchUsers = async () => {
          try {
              const res = await axiosInstance.get(
                  `users/finduserbyusername/${user.username}`,
                  {
                  headers:  { 
                      token: `Bearer ${token}`,
                  }
              });
              dispatch( loginSuccess(res.data) );
              
          } catch (error) {
              console.log(error);
          }
        }
        const getUserPosts= async () => {
          try {
            const res = await axiosInstance.get(
              `posts/findallimages/${user._id}`,
              {
                headers:  { 
                  token: `Bearer ${token}`,
                }
              });
              setPosts(res.data)
          } catch (error) {
            console.log(error);
          }
        }
        getUserPosts()
        fetchUsers()
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  return( 
    <Router>
        <Routes>
          <Route 
            path='/' 
            element={user 
              ? <HomePage user={user} posts={posts} />
              : <Navigate to='/login'/>
            }
          />
          <Route path='/profil' element={<ProfilePage user={user} posts={posts} />}/>
          <Route path='/settings' element={<SettingProfilePage user={user} />}/>
          <Route path='/newpost' element={<CreatePostPage user={user} />}/>
          <Route path='/message' element={<MessagePage user={user} />}/>
          <Route path='/visitprofil' element={<OtherProfilePage />}/>
          <Route  
            path='/login' 
            element={user 
              ? <Navigate to='/'/>
              : <LoginPage />
            }
          />
          <Route exact path='/register' element={<RegisterPage />}/>
        </Routes>
    </Router>
  );
};

export default App;