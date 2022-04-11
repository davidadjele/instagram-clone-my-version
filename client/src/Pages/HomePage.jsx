import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import BottomMobileBar from '../Components/BottomMobileBar';
import Feed from '../Components/Feed';
import Navbar from '../Components/Navbar';
import SideBar from '../Components/SideBar';
import SuggestionsUsers from '../Components/SuggestionsUsers';
import { setUserDataStatus, updateUser } from '../redux/userRedux';
import { axiosInstance, fetchUsers, getNewUsers } from '../requestMethods';
import {mobile} from '../responsive.js'

const Container = styled.div`
margin-bottom: 8vh;
`;

const SugestionContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
  ${mobile({ display:'flex' })}
`

const HomePage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser);
  const userDataChanged = useSelector((state) => state.user.currentUserDataChanged);
  const OtherUserDataChanged =  useSelector((state) => state.otherUser.OtherUserDataChanged);
  const token =  useSelector((state) => state.user.currentUserToken);
  const [posts,setPosts] = useState([]);
  const [newUserSuggestion,setNewUserSuggestion] = useState(false);
  const [suggestionUser,setSuggestionUser] = useState(null);

  useEffect(()=>{
    getNewUsers(setSuggestionUser,user,token);
  },[OtherUserDataChanged])

  useEffect( () => {
    if(user.numberOfFollowing.length === 0) {
      setNewUserSuggestion(true);
    }else{
      setNewUserSuggestion(false);
    }
      const updateInfo = async () => {
        if(userDataChanged || posts.length === 0) {
            try {
              const res = await axiosInstance.get(
                `posts/findallimagesv2/${user._id}`,
                {
                  headers:  { 
                    token: `Bearer ${token}`,
                  }
                });
                setPosts(res.data)
            } catch (error) {
              console.log(error);
            }
          await fetchUsers(dispatch,user,token, updateUser)
          
          dispatch(setUserDataStatus(false));
        }
      }
      updateInfo()
    
  });
  return (
    <Container>
        <Navbar user={user}/>
        <SideBar user={user}/>
        {newUserSuggestion && <SugestionContainer>
          {suggestionUser?.map(e => <SuggestionsUsers key={e._id} user={e}/>)}
        </SugestionContainer>}
        <Feed user={user} posts={posts} />
        <BottomMobileBar />
    </Container>
  )
}

export default HomePage