import styled from 'styled-components'
import BottomMobileBar from '../Components/BottomMobileBar';
import Feed from '../Components/Feed';
import Navbar from '../Components/Navbar';
import SideBar from '../Components/SideBar';


const Container = styled.div`
`;

const HomePage = (userData) => {

  return (
    <Container>
        <Navbar user={userData.user}/>
        <SideBar user={userData.user}/>
        <Feed user={userData.user} posts={userData.posts} />
        <BottomMobileBar />
    </Container>
  )
}

export default HomePage