import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import BottomMobileBar from '../Components/BottomMobileBar';
import Feed from '../Components/Feed';
import Navbar from '../Components/Navbar';
import SideBar from '../Components/SideBar';
import { setUserDataStatus, updateUser } from '../redux/userRedux';
import { fetchUsers, getUserPosts } from '../requestMethods';


const Container = styled.div`
`;

const HomePage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser);
  const userDataChanged = useSelector((state) => state.user.currentUserDataChanged);
  const token =  useSelector((state) => state.user.currentUserToken);
  const [posts,setPosts] = useState([]);
  useEffect(async () => {
    
    //Fetch data on change (real data time)
    if(userDataChanged || posts.length === 0) {
      await getUserPosts(dispatch,setPosts,user,token)
      
      await fetchUsers(dispatch,user,token, updateUser)
      
      dispatch(setUserDataStatus(false));
    }
  });
  return (
    <Container>
        <Navbar user={user}/>
        <SideBar user={user}/>
        <Feed user={user} posts={posts} />
        <BottomMobileBar />
    </Container>
  )
}

export default HomePage