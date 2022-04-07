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
import { loginSuccess, setUserDataStatus } from "./redux/userRedux";
import { fetchUsers, getUserPosts } from "./requestMethods";

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser);
  const userDataChanged = useSelector((state) => state.user.currentUserDataChanged);
  const token =  useSelector((state) => state.user.currentUserToken);
  const [posts,setPosts] = useState([]);

  useEffect(() => {
    //Fetch data on change (real data time)
    if(userDataChanged){
      getUserPosts(setPosts,user,token)
      fetchUsers(dispatch,user,token, loginSuccess)
      dispatch(setUserDataStatus(false));
    }
  });

  return( 
    <Router>
        <Routes>
          <Route 
            exact
            path='/' 
            element={user 
              ? <HomePage user={user} posts={posts} />
              : <Navigate to='/login'/>
            }
          />
          <Route path='/profil' element={user ? <ProfilePage user={user} posts={posts} /> : <LoginPage/>}/>
          <Route path='/settings' element={user ? <SettingProfilePage user={user} /> : <Navigate to='/login'/>} />
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