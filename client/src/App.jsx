import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import { useSelector } from "react-redux";

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

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return( 
    <Router>
        <Routes>
          <Route 
            exact
            path='/' 
            element={user 
              ? <HomePage/>
              : <Navigate to='/login'/>
            }
          />
          <Route path='/profil/:username' element={user ? <ProfilePage/> : <Navigate to='/login'/>}/>
          <Route path='/settings/:username' element={user ? <SettingProfilePage user={user} /> : <Navigate to='/login'/>} />
          <Route path='/newpost' element={user ? <CreatePostPage user={user} /> : <Navigate to='/login'/>}/>
          <Route path='/message' element={user ? <MessagePage user={user} />: <Navigate to='/login'/>}/>
          <Route path='/visitprofil/:username' element={ user ? <OtherProfilePage /> : <Navigate to='/login'/>}/>
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