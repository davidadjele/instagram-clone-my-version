import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import BottomMobileBar from '../Components/BottomMobileBar';
import Feed from '../Components/Feed';
import Navbar from '../Components/Navbar';
import SideBar from '../Components/SideBar';
import { setUserDataStatus, updateUser } from '../redux/userRedux';
import { axiosInstance, fetchUsers } from '../requestMethods';


const Container = styled.div`
`;

const HomePage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser);
  const userDataChanged = useSelector((state) => state.user.currentUserDataChanged);
  const token =  useSelector((state) => state.user.currentUserToken);
  const [posts,setPosts] = useState([]);
  useEffect( () => {
    
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
        <Feed user={user} posts={posts} />
        <BottomMobileBar />
    </Container>
  )
}

export default HomePage